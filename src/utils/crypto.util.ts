import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const SEP = '-'
const KEY_LEN = 32

export function encrypt(passphrase: string, salt: string, data: string) {
  const key = crypto.scryptSync(passphrase, salt, KEY_LEN)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()])
  return `${encrypted.toString('hex')}${SEP}${iv.toString('hex')}`
}

export function decrypt(passphrase: string, salt: string, encryptedAndIv: string) {
  const [encrypted, ivHex] = encryptedAndIv.split(SEP)
  if (!encrypted || !ivHex) throw new Error(`decrypt failed`)
  const iv = Buffer.from(ivHex, 'hex')
  const key = crypto.scryptSync(passphrase, salt, KEY_LEN)
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  const decrypted = Buffer.concat([decipher.update(encrypted, 'hex'), decipher.final()])
  return decrypted.toString('utf8')
}
