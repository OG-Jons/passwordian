import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('/master')
  async updateMasterPassword(
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: User,
  ): Promise<{ accessToken: string }> {
    updatePasswordDto.username = user.username;
    return await this.authService.updateMasterPassword(updatePasswordDto, user);
  }
}
