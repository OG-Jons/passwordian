import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  async encrypt(text: string): Promise<{ text: string; salt: string }> {
    const salt = await bcrypt.genSalt();
    const encryptedText = await bcrypt.hash(text, salt);
    return { text: encryptedText, salt };
  }
}
