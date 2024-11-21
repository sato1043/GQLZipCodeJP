/*
 * 注意: このファイルにフォーマッターを IntelliJ でかけると壊れる（コマンドは大丈夫だった）
 * biome の intelliJ プラグインで保存時フォーマットをかけると半角カナ濁点と半濁点が削除されてしまう。
 * これはプラグイン処理のパイプラインが合わないのだと思う（コマンドラインからはそうならないので推測）
 */

/** 文字変換テーブル(記号抜き)・半角文字→全角文字 */
const han2ZenMap: { [key: string]: string } = {
  // 数字
  0: '０',
  1: '１',
  2: '２',
  3: '３',
  4: '４',
  5: '５',
  6: '６',
  7: '７',
  8: '８',
  9: '９',
  // 英小文字
  a: 'ａ',
  b: 'ｂ',
  c: 'ｃ',
  d: 'ｄ',
  e: 'ｅ',
  f: 'ｆ',
  g: 'ｇ',
  h: 'ｈ',
  i: 'ｉ',
  j: 'ｊ',
  k: 'ｋ',
  l: 'ｌ',
  m: 'ｍ',
  n: 'ｎ',
  o: 'ｏ',
  p: 'ｐ',
  q: 'ｑ',
  r: 'ｒ',
  s: 'ｓ',
  t: 'ｔ',
  u: 'ｕ',
  v: 'ｖ',
  w: 'ｗ',
  x: 'ｘ',
  y: 'ｙ',
  z: 'ｚ',
  // 英大文字
  A: 'Ａ',
  B: 'Ｂ',
  C: 'Ｃ',
  D: 'Ｄ',
  E: 'Ｅ',
  F: 'Ｆ',
  G: 'Ｇ',
  H: 'Ｈ',
  I: 'Ｉ',
  J: 'Ｊ',
  K: 'Ｋ',
  L: 'Ｌ',
  M: 'Ｍ',
  N: 'Ｎ',
  O: 'Ｏ',
  P: 'Ｐ',
  Q: 'Ｑ',
  R: 'Ｒ',
  S: 'Ｓ',
  T: 'Ｔ',
  U: 'Ｕ',
  V: 'Ｖ',
  W: 'Ｗ',
  X: 'Ｘ',
  Y: 'Ｙ',
  Z: 'Ｚ',
  // 日カナ
  ｶﾞ: 'ガ',
  ｷﾞ: 'ギ',
  ｸﾞ: 'グ',
  ｹﾞ: 'ゲ',
  ｺﾞ: 'ゴ',
  ｻﾞ: 'ザ',
  ｼﾞ: 'ジ',
  ｽﾞ: 'ズ',
  ｾﾞ: 'ゼ',
  ｿﾞ: 'ゾ',
  ﾀﾞ: 'ダ',
  ﾁﾞ: 'ヂ',
  ﾂﾞ: 'ヅ',
  ﾃﾞ: 'デ',
  ﾄﾞ: 'ド',
  ﾊﾞ: 'バ',
  ﾋﾞ: 'ビ',
  ﾌﾞ: 'ブ',
  ﾍﾞ: 'ベ',
  ﾎﾞ: 'ボ',
  ﾊﾟ: 'パ',
  ﾋﾟ: 'ピ',
  ﾌﾟ: 'プ',
  ﾍﾟ: 'ペ',
  ﾎﾟ: 'ポ',
  ｳﾞ: 'ヴ',
  ﾜﾞ: 'ヷ',
  ｦﾞ: 'ヺ',
  ﾞ: '゛', // この文字はエディタがくずれるので注意
  ﾟ: '゜', // この文字はエディタがくずれるので注意
  ｱ: 'ア',
  ｲ: 'イ',
  ｳ: 'ウ',
  ｴ: 'エ',
  ｵ: 'オ',
  ｶ: 'カ',
  ｷ: 'キ',
  ｸ: 'ク',
  ｹ: 'ケ',
  ｺ: 'コ',
  ｻ: 'サ',
  ｼ: 'シ',
  ｽ: 'ス',
  ｾ: 'セ',
  ｿ: 'ソ',
  ﾀ: 'タ',
  ﾁ: 'チ',
  ﾂ: 'ツ',
  ﾃ: 'テ',
  ﾄ: 'ト',
  ﾅ: 'ナ',
  ﾆ: 'ニ',
  ﾇ: 'ヌ',
  ﾈ: 'ネ',
  ﾉ: 'ノ',
  ﾊ: 'ハ',
  ﾋ: 'ヒ',
  ﾌ: 'フ',
  ﾍ: 'ヘ',
  ﾎ: 'ホ',
  ﾏ: 'マ',
  ﾐ: 'ミ',
  ﾑ: 'ム',
  ﾒ: 'メ',
  ﾓ: 'モ',
  ﾔ: 'ヤ',
  ﾕ: 'ユ',
  ﾖ: 'ヨ',
  ﾗ: 'ラ',
  ﾘ: 'リ',
  ﾙ: 'ル',
  ﾚ: 'レ',
  ﾛ: 'ロ',
  ﾜ: 'ワ',
  ｦ: 'ヲ',
  ﾝ: 'ン',
  ｧ: 'ァ',
  ｨ: 'ィ',
  ｩ: 'ゥ',
  ｪ: 'ェ',
  ｫ: 'ォ',
  ｯ: 'ッ',
  ｬ: 'ャ',
  ｭ: 'ュ',
  ｮ: 'ョ',
}

const han2ZenRegExp = new RegExp(`(${Object.keys(han2ZenMap).join('|')})`, 'g') // [a|b|c|...]  生成コスト一度だけ許容

/**  文字変換(記号抜き)・半角文字→全角文字 */
export const toZenkaku = (str: string) =>
  str.replace(han2ZenRegExp, (ch) => han2ZenMap[ch] ?? ch)