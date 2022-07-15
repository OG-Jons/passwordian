import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userService.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userService.validateUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async updateMasterPassword(
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userService.validateUserPassword(
      updatePasswordDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const updated = await this.userService.updateMasterPassword(
      updatePasswordDto,
    );

    if (!updated) {
      throw new UnauthorizedException('Invalid credentials on update');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
