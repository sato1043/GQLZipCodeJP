import type { TownAreaResolvers } from './../../types.generated.js'

export const TownArea: TownAreaResolvers = {
  postalCode: (_) => _.postalCode,
  prefectureName: (_) => _.prefectureName,
  prefectureKana: (_) => _.prefectureKana,
  cityName: (_) => _.cityName,
  cityKana: (_) => _.cityKana,
  townAreaName: (_) => _.townAreaName,
  townAreaKana: (_) => _.townAreaKana,
  chomeList: (_) => _.chomeList,

  difficultyDoubleMeaningTownArea: (_) => _.difficultyDoubleMeaningTownArea,
  difficultyNeedChome: (_) => _.difficultyNeedChome,
  difficultyNeedKoaza: (_) => _.difficultyNeedKoaza,
  difficultyNotOnlyZipAndBanti: (_) => _.difficultyNotOnlyZipAndBanti,
}
