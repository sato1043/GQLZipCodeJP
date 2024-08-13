/**
 * 文字列暗号化(-e)/復号化(-d)
 *
 * パスフレーズ/ソルト表示；
 * > dotenv -- tsx keytool.ts -i
 *
 * APIキー発行；
 * > dotenv -- tsx keytool.ts -p abc -s def -e
 *   - 発行された passphrase / salt をアプリ内の環境変数等で秘密に保持します
 *   - 同じ passphrase / salt を使うかぎり、APIキーを複合できます
 *   - 発行された code をアプリ内に記録します
 *   - 発行された apiKey は相手に伝え、自前では破棄して保持しません
 *   - 一度発行したAPIキーは二度発行できません
 *   - TODO パス・ソルト固定かつ .api-keys.json は平文で保存しており、簡易
 *   - TODO 新しい APIキーが有効にするために再起動が必要
 *
 * APIキー解読；
 * > dotenv -- tsx keytool.ts -p abc -s def -d <暗号化文字列>
 *   - 通常運用でAPIキーを手元で解読する必要はありません
 */

import * as uuid from 'uuid'
import { decrypt, encrypt } from '../src/utils/crypto.util.ts'
import isString from 'lodash/isString.js'
//@ts-expect-error esModuleInterop:true にして default を付加してある
import getopts from 'getopts'
import type { ParsedOptions } from 'getopts'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const options: ParsedOptions = getopts(process.argv.slice(2))
const optionP = isString(options.p) ? options.p : undefined
const optionS = isString(options.s) ? options.s : undefined
const optionE = isString(options.e) ? options.e : undefined
const optionD = isString(options.d) ? options.d : undefined

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const passphrase = optionP || process.env.APIKEY_PASSPHRASE || uuid.v4()
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const salt = optionS || process.env.APIKEY_SALT || uuid.v4()
if (!passphrase || !salt) {
  console.error(`error: empty passphrase or salt`)
  process.exit(2)
}

if (options.i) {
  const code = uuid.v4()
  console.log(`APIKEY_PASSPHRASE=${passphrase}`)
  console.log(`APIKEY_SALT=${salt}`)
  console.log(`APIKEY_CODELIST=["${code}"]`)
  console.log(`TEST_APIKEY=${encrypt(passphrase, salt, code)}`)
} else if (options.e) {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const code = optionE || uuid.v4()
  console.log(
    JSON.stringify(
      {
        passphrase,
        salt,
        code,
        apiKey: encrypt(passphrase, salt, code),
      },
      null,
      2,
    ),
  )
} else if (options.d) {
  if (optionD) {
    console.log(decrypt(passphrase, salt, optionD))
  } else {
    console.error('error: apikey not specified')
  }
} else {
  console.error('error: no method specified: (use -d or -e)')
}
