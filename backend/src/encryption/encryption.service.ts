import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  async encryptWithSalt(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, salt);
  }
}
