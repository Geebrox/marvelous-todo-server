import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  type BinaryLike,
  type BinaryToTextEncoding,
  type CipherCCMTypes,
  type CipherGCMTypes,
} from 'crypto';

export const generateHmac = (
  data: BinaryLike,
  key: BinaryLike,
  digest?: BinaryToTextEncoding
) => {
  return createHmac('sha256', key).update(data).digest(digest);
};

export const generateIV = (length = 16) => {
  return randomBytes(length);
};

export const makeCipherKey = (key: BinaryLike) => {
  return Buffer.from(randomBytes(32)).fill(key.toString());
};

export const encryptData = (
  data: BinaryLike,
  key: BinaryLike,
  algorithm: CipherCCMTypes | CipherGCMTypes | 'aes-256-cbc' = 'aes-256-cbc'
) => {
  const iv = generateIV();
  const cipherKey = makeCipherKey(key);
  const cipher = createCipheriv(algorithm, cipherKey, iv);
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

  return `${iv.toString('hex')}:${encryptedData.toString('hex')}`;
};

export const decryptData = (
  data: BinaryLike,
  key: BinaryLike,
  algorithm: CipherCCMTypes | CipherGCMTypes | 'aes-256-cbc' = 'aes-256-cbc'
) => {
  const [iv, encryptedData] = data.toString().split(':');
  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedDataBuffer = Buffer.from(encryptedData, 'hex');
  const cipherKey = makeCipherKey(key);
  const decipher = createDecipheriv(algorithm, cipherKey, ivBuffer);
  const decryptedData = Buffer.concat([
    decipher.update(encryptedDataBuffer),
    decipher.final(),
  ]);

  return decryptedData.toString();
};
