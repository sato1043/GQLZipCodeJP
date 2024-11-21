import { ValidationError } from 'yup'
import yup from './yup.util.ts'

describe('yup.string().hiragana()', () => {
  it('漢字を異常とする', () => {
    expect(() => {
      yup.string().hiragana().validateSync('漢字')
    }).toThrow()
  })
  it('カタカナを異常とする', () => {
    expect(() => {
      yup.string().hiragana().validateSync('アイウ')
    }).toThrow()
  })
  it('英字まじりのひらがなを異常とする', () => {
    expect(() => {
      yup.string().hiragana().validateSync('あいうa')
    }).toThrow()
  })
  it('数字まじりのひらがなを異常とする', () => {
    expect(() => {
      yup.string().hiragana().validateSync('あいう0')
    }).toThrow()
  })
  it('ひらがなを正常とする', () => {
    expect(() => {
      yup.string().hiragana().validateSync('あいうー')
    }).not.toThrow()
  })
  it('ラベルとエラーメッセージを指定できる', () => {
    try {
      yup.string().hiragana().validateSync('0')
    } catch (e) {
      if (e instanceof ValidationError) {
        expect(e.type).toEqual('hiragana')
        expect(e.errors[0]).toEqual('ひらがなだけにします')
      }
    }
    try {
      yup.string().label('test').hiragana().validateSync('0')
    } catch (e) {
      if (e instanceof ValidationError) {
        expect(e.errors[0]).toEqual('testはひらがなだけにします')
      }
    }
  })
})

describe('yup.string().katakana()', () => {
  it('漢字を異常とする', () => {
    expect(() => {
      yup.string().katakana().validateSync('漢字')
    }).toThrow()
  })
  it('ひらがなを異常とする', () => {
    expect(() => {
      yup.string().katakana().validateSync('あいう')
    }).toThrow()
  })
  it('英字まじりのカタカナを異常とする', () => {
    expect(() => {
      yup.string().katakana().validateSync('アイウa')
    }).toThrow()
  })
  it('数字まじりのカタカナを異常とする', () => {
    expect(() => {
      yup.string().katakana().validateSync('アイウ0')
    }).toThrow()
  })
  it('半角カタカナを正常とする', () => {
    expect(() => {
      yup.string().katakana().validateSync('ｱｲｳｰ')
    }).not.toThrow()
  })
  it('カタカナを正常とする', () => {
    expect(() => {
      yup.string().katakana().validateSync('アイウー')
    }).not.toThrow()
  })
  it('ラベルとエラーメッセージを指定できる', () => {
    try {
      yup.string().katakana().validateSync('0')
    } catch (e) {
      if (e instanceof ValidationError) {
        expect(e.type).toEqual('katakana')
        expect(e.errors[0]).toEqual('カタカナだけにします')
      }
    }
    try {
      yup.string().label('test').katakana().validateSync('0')
    } catch (e) {
      if (e instanceof ValidationError) {
        expect(e.errors[0]).toEqual('testはカタカナだけにします')
      }
    }
  })
})

describe('yup.string().addressKana()', () => {
  it('漢字を異常とする', () => {
    expect(() => {
      yup.string().addressKana().validateSync('漢字')
    }).toThrow()
  })
  it('ひらがなを異常とする', () => {
    expect(() => {
      yup.string().addressKana().validateSync('あいう')
    }).toThrow()
  })
  it('英字を正常とする', () => {
    expect(() => {
      yup.string().addressKana().validateSync('amAMａｍＡＭ')
    }).not.toThrow()
  })
  it('英字まじりのカタカナを正常とする', () => {
    expect(() => {
      yup.string().addressKana().validateSync('アイウamAMａｍＡＭ')
    }).not.toThrow()
  })
  it('数字まじりのカタカナを正常とする', () => {
    expect(() => {
      yup.string().addressKana().validateSync('アイウ0（）－()-')
    }).not.toThrow()
  })
  it('半角カタカナを正常とする', () => {
    expect(() => {
      yup.string().addressKana().validateSync('ｱｲｳｰ')
    }).not.toThrow()
  })
  it('カタカナを正常とする', () => {
    expect(() => {
      yup.string().addressKana().validateSync('アイウー')
    }).not.toThrow()
  })
  it('ラベルとエラーメッセージを指定できる', () => {
    try {
      yup.string().addressKana().validateSync('0')
    } catch (e) {
      if (e instanceof ValidationError) {
        expect(e.type).toEqual('addressKana')
        expect(e.errors[0]).toEqual('カタカナだけにします')
      }
    }
    try {
      yup.string().label('test').addressKana().validateSync('0')
    } catch (e) {
      if (e instanceof ValidationError) {
        expect(e.errors[0]).toEqual('testはカタカナだけにします')
      }
    }
  })
})
