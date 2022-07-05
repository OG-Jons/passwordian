import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class EncryptionService {
  async encryptWithSalt(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, salt);
  }

  async encryptPassword(
    textToEncrypt: string,
    key: Buffer,
    iv: Buffer,
  ): Promise<string> {
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return encryptedText.toString('base64');
  }

  decryptPassword = async (
    encryptedText: string,
    key: Buffer,
    iv: Buffer,
  ): Promise<string> => {
    const encryptedTextBuffer = Buffer.from(encryptedText, 'base64');
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedTextBuffer),
      decipher.final(),
    ]);
    return decryptedText.toString('base64');
  };
}
