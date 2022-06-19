import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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

  @Post()
  create(@Body() createPasswordDto: CreatePasswordDto): Promise<Password> {
    return this.passwordsService.create(createPasswordDto);
  }

  @Get()
  findAll(@GetUser() user: User): Promise<Password[]> {
    return this.passwordsService.findAllFromUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Password> {
    return this.passwordsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdateResult> {
    return this.passwordsService.update(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.passwordsService.remove(+id);
  }
}
