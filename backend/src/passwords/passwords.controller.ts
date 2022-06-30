import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Password } from './entities/password.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Passwords')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createPasswordDto: CreatePasswordDto,
    @GetUser() user: User,
  ): Promise<Password> {
    return this.passwordsService.create(createPasswordDto, user);
  }

  @Get()
  findAll(@GetUser() user: User): Promise<Password[]> {
    return this.passwordsService.findAllFromUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User): Promise<Password> {
    return this.passwordsService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.passwordsService.update(+id, updatePasswordDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.passwordsService.remove(+id, user);
  }
}
