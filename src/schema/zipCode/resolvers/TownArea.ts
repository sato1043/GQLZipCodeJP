import type { TownAreaResolvers } from './../../types.generated.js'

export const TownArea: TownAreaResolvers = {
  id: (_) => _.id,
  name: (_) => _.name,
  kana: (_) => _.kana,
  postalCode: (_) => _.postalCode,
  prefectureName: (_) => _.prefectureName,
  prefectureKana: (_) => _.prefectureKana,
  cityName: (_) => _.cityName,
  cityKana: (_) => _.cityKana,
  chomeList: (_) => _.chomeList,

  difficultyDoubleMeaningZipArea: (_) => _.difficultyDoubleMeaningZipArea,
  difficultyNeedChome: (_) => _.difficultyNeedChome,
  difficultyNeedKoaza: (_) => _.difficultyNeedKoaza,
  difficultyNotOnlyZipAndBanti: (_) => _.difficultyNotOnlyZipAndBanti,

  createdDateTime: (_) => _.createdDateTime,
  updateDateTime: (_) => _.updateDateTime,
  updateReason: (_) => _.updateReason,
}
