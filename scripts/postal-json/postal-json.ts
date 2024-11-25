import { promises as fs } from 'node:fs'
import { parse } from 'csv-parse/sync'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

import pick from 'lodash/pick.js'
import type { PostalJson, TownAreaEntity } from '../../src/generated/postal.json'
import type { UpdateReason } from '../../src/schema/types.generated.ts'
import { toZenkaku } from '../../src/utils/text.util.ts'
import yup from '../../src/utils/yup.util.ts'

const OUTPUT_POSTAL_JSON = 'postal.json'

const normalizeAddressKana = (value: string) => {
  return toZenkaku(value)
    .replaceAll(' ', '')
    .replaceAll('　', '')
    .replaceAll('-', '－') // 全角ハイフン
    .replaceAll('−', '－') // 郵便番号データCSVで使われる詳細不明な文字コードのハイフン
    .replaceAll('(', '（')
    .replaceAll(')', '）')
    .replaceAll('ｰ', 'ー') // 長音記号 ex.カナー
}

const UTF_KEN_ALL_CSV = 'data/utf_ken_all.csv'
const UTF_KEN_ALL_UPDATED_DATE = '2024-10-31T00:00:00+09:00'
const UTF_KEN_ALL_META = {
  localGovernmentCode: {
    kana: '全国地方公共団体コード', // 変換未使用
    name: 'localGovernmentCode',
    schema: yup.string().length(5),
    normalize: undefined,
    transform: undefined,
    export: false,
  },
  oldPostalCode: {
    kana: '旧郵便番号', // 変換未使用
    name: 'oldPostalCode',
    schema: yup.string().length(5),
    normalize: undefined,
    transform: undefined,
    export: false,
  },
  postalCode: {
    kana: '郵便番号',
    name: 'postalCode',
    schema: yup.string().length(7),
    normalize: undefined,
    transform: (value: string) => `${value.substring(0, 3)}-${value.substring(3, 7)}`,
    export: true,
  },
  prefectureKana: {
    kana: '都道府県名カナ',
    name: 'prefectureKana',
    schema: yup.string().addressKana(),
    normalize: normalizeAddressKana,
    transform: undefined,
    export: true,
  },
  cityKana: {
    kana: '市区町村名カナ',
    name: 'cityKana',
    schema: yup.string().addressKana(),
    normalize: normalizeAddressKana,
    transform: undefined,
    export: true,
  },
  townAreaKana: {
    kana: '町域名カナ',
    name: 'townAreaKana',
    schema: yup.string().addressKana(),
    normalize: normalizeAddressKana,
    transform: undefined,
    export: true,
  },
  prefectureName: {
    kana: '都道府県名',
    name: 'prefectureName',
    schema: yup.string(),
    normalize: normalizeAddressKana,
    transform: undefined,
    export: true,
  },
  cityName: {
    kana: '市区町村名',
    name: 'cityName',
    schema: yup.string(),
    normalize: normalizeAddressKana,
    transform: undefined,
    export: true,
  },
  townAreaName: {
    kana: '町域名',
    name: 'townAreaName',
    schema: yup.string(),
    normalize: normalizeAddressKana,
    transform: undefined,
    export: true,
  },
  difficultyNotOnlyZipAndBanti: {
    kana: '郵便番号と番地だけで住所特定できない',
    name: 'difficultyNotOnlyZipAndBanti',
    schema: yup.string().oneOf(['0', '1']),
    normalize: undefined,
    transform: (value: string) => value === '1',
    export: true,
  },
  difficultyNeedKoaza: {
    kana: '町域の小字がわかるまで住所特定できない',
    name: 'difficultyNeedKoaza',
    schema: yup.string().oneOf(['0', '1']),
    normalize: undefined,
    transform: (value: string) => value === '1',
    export: true,
  },
  difficultyNeedChome: {
    kana: '町域の丁目がわかるまで住所特定できない',
    name: 'difficultyNeedChome',
    schema: yup.string().oneOf(['0', '1']),
    normalize: undefined,
    transform: (value: string) => value === '1',
    export: true,
  },
  difficultyDoubleMeaningTownArea: {
    kana: '二つ以上の町域を表す郵便番号のため具体的にどの町域かわかるまで住所特定できない',
    name: 'difficultyDoubleMeaningTownArea',
    schema: yup.string().oneOf(['0', '1']),
    normalize: undefined,
    transform: (value: string) => value === '1',
    export: true,
  },
  wasRemoved: {
    kana: '提供データ追加修正の有無', // NOTE: JSONとしては含ませるが、使うならバッチ処理ではないだろうか
    name: 'wasRemoved',
    schema: yup.string().oneOf(['0', '1', '2']),
    normalize: undefined,
    transform: undefined,
    export: false,
  },
  updateReason: {
    kana: '提供データ追加修正の変更の理由',
    name: 'updateReason',
    schema: yup.string().oneOf(['0', '1', '2', '3', '4', '5', '6']),
    normalize: undefined,
    transform: (value: string): UpdateReason => {
      switch (value) {
        case '0':
          return 'NO_CHANGE'
        case '1':
          return 'ADMINISTRATION'
        case '2':
          return 'DESIGNATION'
        case '3':
          return 'READJUSTMENT'
        case '4':
          return 'POSTAL_ADJUST'
        case '5':
          return 'CORRECTION'
        case '6':
          return 'ABOLITION'
      }
      return 'NO_CHANGE'
    },
    export: true,
  },
} as const

const WHEN_TOWN_AREA_NOT_SURE = '以下に掲載がない場合'
const TOWN_AREA_NOT_SURE = '（町域不明）'
const TOWN_AREA_NOT_SURE_KANA = '（チョウイキフメイ）'

const RECORD_WAS_REMOVED = '2'

const UTF_KEN_ALL_META_COLUMNS = Object.values(UTF_KEN_ALL_META).map((_) => _.name)
const UTF_KEN_ALL_META_PICKS = Object.values(UTF_KEN_ALL_META)
  .filter((_) => _.export)
  .map((_) => _.name)

// biome-ignore lint/suspicious/noExplicitAny: ReturnTypeの引数型が必要
type ReturnTypeOrString<T> = T extends (...args: any) => infer R ? R : string
type UtfKenAllRecord = {
  [key in keyof typeof UTF_KEN_ALL_META]: ReturnTypeOrString<
    (typeof UTF_KEN_ALL_META)[key]['transform']
  >
}

// TODO const convert JIGYOSHO_CSV = 'data/utf_ken_all.csv'

//
// 以下、郵便番号データのJSON変換
//

const content = await fs.readFile(UTF_KEN_ALL_CSV)

const count = ((str) => {
  const matches = str.match(/\r\n|\r|\n/g)
  return matches ? matches.length : 0
})(content.toString('utf-8'))

console.log(`${UTF_KEN_ALL_CSV}: ${count} lines converting...`)

const records: { [postalCode: string]: TownAreaEntity[] } = {}

parse(content, {
  encoding: 'utf8',
  skipEmptyLines: true,
  columns: UTF_KEN_ALL_META_COLUMNS,
  delimiter: ',',
  cast: (value, context) => {
    const { kana, schema, normalize, transform } =
      UTF_KEN_ALL_META[UTF_KEN_ALL_META_COLUMNS[context.index]]
    const normalizedValue = normalize?.(value) ?? value
    try {
      schema.label(kana).validateSync(normalizedValue)
    } catch (e) {
      console.error({ value, normalizedValue, e: pick(e, ['value']) })
      throw e
    }
    return transform?.(normalizedValue) ?? normalizedValue
  },
  onRecord: (record: UtfKenAllRecord, _context) => {
    if (record.wasRemoved === RECORD_WAS_REMOVED) {
      return
    }
    const jsonRecord: TownAreaEntity = {
      ...pick(record, UTF_KEN_ALL_META_PICKS),
      ...(record.townAreaName === WHEN_TOWN_AREA_NOT_SURE
        ? {
            townAreaName: TOWN_AREA_NOT_SURE,
            townAreaKana: TOWN_AREA_NOT_SURE_KANA,
          }
        : {}),
      chomeList: [],
    }
    records[record.postalCode] = records[record.postalCode]
      ? [...records[record.postalCode], jsonRecord]
      : [jsonRecord]
  },
})

const countConverted = Object.values(records).reduce((sum, arr) => sum + arr.length, 0)
if (count !== countConverted) {
  throw new Error(`converted lines not matched: ${count} : ${countConverted}`)
}

const result: PostalJson = {
  meta: {
    count,
    updated: UTF_KEN_ALL_UPDATED_DATE,
    converted: format(toZonedTime(new Date(), 'Asia/Tokyo'), "yyyy-MM-dd'T'HH:mm:ssxxx"),
  },
  records,
}

await fs.writeFile(OUTPUT_POSTAL_JSON, JSON.stringify(result, null, 2), 'utf8')
console.log(`${UTF_KEN_ALL_CSV}: ${countConverted} lines converted.`)
