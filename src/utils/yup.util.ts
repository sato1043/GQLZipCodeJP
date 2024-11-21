import * as yup from 'yup'
import type { LocaleObject, Message } from 'yup'

export type * from 'yup'
export * from 'yup'

declare module 'yup' {
  interface StringSchema {
    hiragana(): this
    katakana(): this
    addressKana(): this
  }
  /* FIXME StringLocaleの型マージしたいが、StringLocale がexport されていないせいか、できなかった
  interface StringLocale {
    hiragana?: Message
    katakana?: Message
    addressKatakana(): Message
  }
  */
}

const labelWa = <T extends { label: string }>(prm: T) => {
  return prm.label ? `${prm.label}は` : ''
}

// https://github.com/jquense/yup?tab=readme-ov-file#error-message-customization
const localeObject: LocaleObject = {
  mixed: {
    default: (_) => `${labelWa(_)}無効です`,
    required: (_) => `${labelWa(_)}必須です`,
    oneOf: (_) => `${labelWa(_)}どれか次の値にします:${_.values}`,
    notOneOf: (_) => `${labelWa(_)}次の値にはできません:${_.values}`,
    notNull: (_) => `${labelWa(_)}が未設定です`,
    notType: (_) => `${labelWa(_)}形式が違います`,
    defined: (_) => `${labelWa(_)}が未定義です`,
  },
  string: {
    length: (_) => `${labelWa(_)}${_.length}文字にします`,
    min: (_) => `${labelWa(_)}最小${_.min}文字にします`,
    max: (_) => `${labelWa(_)}最大${_.max}文字にします`,
    matches: (_) => `${labelWa(_)}次の形式にします: "${_.regex}"`,
    email: (_) => `${labelWa(_)}有効なメールアドレスにします`,
    url: (_) => `${labelWa(_)}有効なURLにします`,
    uuid: (_) => `${labelWa(_)}有効なUUIDにします`,
    datetime: (_) => `${labelWa(_)}有効なISO日付文字列にします`,
    datetime_offset: (_) => `${labelWa(_)}有効なタイムゾーンオフセットにします`,
    datetime_precision: (_) => `${labelWa(_)}有効な日付精度にします: "${_.precision}"`,
    trim: (_) => `${labelWa(_)}前後にスペースを入れられません`,
    lowercase: (_) => `${labelWa(_)}小文字にします`,
    uppercase: (_) => `${labelWa(_)}大文字にします`,
    // @ts-ignore
    hiragana: (_) => `${labelWa(_)}ひらがなだけにします`,
    // @ts-ignore
    katakana: (_) => `${labelWa(_)}カタカナだけにします`,
    // @ts-ignore
    addressKana: (_) => `${labelWa(_)}住所カナに有効な文字だけにします`,
  },
  number: {
    min: (_) => `${labelWa(_)}${_.min}以上にします`,
    max: (_) => `${labelWa(_)}${_.max}以下にします`,
    lessThan: (_) => `${labelWa(_)}${_.less}より小さくします`,
    moreThan: (_) => `${labelWa(_)}${_.more}より大きくします`,
    positive: (_) => `${labelWa(_)}正の数にします`,
    negative: (_) => `${labelWa(_)}負の数にします`,
    integer: (_) => `${labelWa(_)}整数にします`,
  },
  date: {
    min: (_) => `${labelWa(_)}${_.min}以降の日付にします`,
    max: (_) => `${labelWa(_)}${_.max}以前の日付にします`,
  },
  boolean: {
    isValue: (_) => `${labelWa(_)}値が必要です`,
  },
  object: {
    noUnknown: (_) => `${labelWa(_)}特定のキーだけ指定できます`,
  },
  array: {
    length: (_) => `${labelWa(_)}項目を${_.length}個にします`,
    min: (_) => `${labelWa(_)}${_.min}個以上の項目が必要です`,
    max: (_) => `${labelWa(_)}${_.max}個以下の項目が必要です`,
  },
  tuple: {
    notType: (_) => `${labelWa(_)}形式が違います`,
  },
}

yup.setLocale(localeObject)

// https://github.com/jquense/yup?tab=readme-ov-file#extending-built-in-schema-with-new-methods
yup.addMethod<yup.StringSchema>(yup.string, 'hiragana', function (message: Message) {
  return this.matches(/^[\p{sc=Hiragana}ーｰ]*$/u, {
    // @ts-ignore
    message: message || localeObject.string?.hiragana || 'only hiragana',
    name: 'hiragana',
  })
})
yup.addMethod<yup.StringSchema>(yup.string, 'katakana', function (message: Message) {
  return this.matches(/^[\p{sc=Katakana}ーｰ]*$/u, {
    // @ts-ignore
    message: message || localeObject.string?.katakana || 'only katakana',
    name: 'katakana',
  })
})
yup.addMethod<yup.StringSchema>(yup.string, 'addressKana', function (message: Message) {
  return this.matches(
    /^[\p{sc=Katakana}ーｰ\p{Number}a-zA-Zａ-ｚＡ-Ｚ（）－、．＜＞・()-−]*$/u,
    {
      // @ts-ignore
      message: message || localeObject.string?.addressKana || 'only address kana',
      name: 'addressKana',
    },
  )
})

export default yup
