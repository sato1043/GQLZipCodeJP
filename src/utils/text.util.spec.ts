/*
 * 注意: このファイルにフォーマッターを IntelliJ でかけると壊れる（コマンドは大丈夫だった）
 * biome の intelliJ プラグインで保存時フォーマットをかけると半角カナ濁点と半濁点が削除されてしまう。
 * これはプラグイン処理のパイプラインが合わないのだと思う（コマンドラインからはそうならないので推測）
 */

import { toZenkaku } from './text.util.ts'

describe('toZenkaku', () => {
  test('半角数字を全角変換', () => {
    expect(toZenkaku('0123')).toEqual('０１２３')
  })
  test('半角英文字を全角変換', () => {
    expect(toZenkaku('abcXYZ')).toEqual('ａｂｃＸＹＺ')
  })
  test('半角カナを全角変換', () => {
    expect(toZenkaku('ｱｲｳｴｵ')).toEqual('アイウエオ')
    expect(toZenkaku('ｧｯｬ')).toEqual('ァッャ')
    expect(toZenkaku('ｶﾞﾊﾞﾊﾟｳﾞ')).toEqual('ガバパヴ')
    expect(toZenkaku('ﾞﾟ')).toEqual('゛゜')
  })
  test('全角カナはそのまま', () => {
    expect(toZenkaku('アイウエオ')).toEqual('アイウエオ')
    expect(toZenkaku('ァッャ')).toEqual('ァッャ')
    expect(toZenkaku('ガバパヴ')).toEqual('ガバパヴ')
  })
})
