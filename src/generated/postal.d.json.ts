// import type { UpdateReason } from '../schema/types.generated.js'
//
// NOTE: declare module は相対パスでローカルファイルと認識する
// NOTE: d.json.ts は"allowArbitraryExtensions": trueで使える
// NOTE: interfaceにする。typeでは効かない

import type { UpdateReason } from '../schema/types.generated.js'

declare module './postal.json' {
  export type TownAreaEntity = {
    postalCode: string
    prefectureName: string
    prefectureKana: string
    cityName: string
    cityKana: string
    townAreaName: string
    townAreaKana: string
    chomeList: string[]
    difficultyNeedChome: boolean
    difficultyNeedKoaza: boolean
    difficultyNotOnlyZipAndBanti: boolean
    difficultyDoubleMeaningTownArea: boolean
    updateReason: UpdateReason
  }

  export interface PostalJson {
    meta: {
      count: number
      updated: string
      converted: string
    }
    records: {
      [postalCode: string]: TownAreaEntity[]
    }
  }

  declare const value: PostalJson
  export = value
}
