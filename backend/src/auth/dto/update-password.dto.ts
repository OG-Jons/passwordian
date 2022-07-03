import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class UpdatePasswordDto extends PartialType(AuthCredentialsDto) {
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPassword: string;
}
