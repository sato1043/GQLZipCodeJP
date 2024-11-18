import type { UpdateReason } from './types.generated.js'

export type TownAreaEntity = {
  id: string
  name: string
  kana: string
  postalCode: string
  prefectureName: string
  prefectureKana: string
  cityName: string
  cityKana: string
  chomeList: string[]
  difficultyDoubleMeaningZipArea: boolean
  difficultyNeedChome: boolean
  difficultyNeedKoaza: boolean
  difficultyNotOnlyZipAndBanti: boolean
  createdDateTime: Date
  updateDateTime: Date
  updateReason: UpdateReason
}

export type TownAreaDictionary = {
  [postalCode: string]: TownAreaEntity
}

// TODO implement ********
export const townAreaDictionary: TownAreaDictionary = {
  '100-0001': {
    id: 'dummy-id',
    postalCode: '1000001',
    name: '千代田',
    kana: 'チヨダ',
    prefectureName: '東京都',
    prefectureKana: 'トウキョウト',
    cityName: '千代田区',
    cityKana: 'チヨダク',
    chomeList: [],
    difficultyDoubleMeaningZipArea: false,
    difficultyNeedChome: false,
    difficultyNeedKoaza: false,
    difficultyNotOnlyZipAndBanti: false,
    createdDateTime: new Date(),
    updateDateTime: new Date(),
    updateReason: 'NO_CHANGE',
  },
}

// UserContext: created for each incoming request with access to the default and server context
// https://the-guild.dev/graphql/yoga-server/docs/features/context#default-context
export type IncomingRequestContext = {
  townAreaDictionary: TownAreaDictionary
}
