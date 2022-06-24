import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Password } from '../passwords/entities/password.entity';
import { Category } from '../categories/entities/category.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  masterPassword: string;

  @OneToMany(() => Password, (password) => password.user, { eager: true })
  passwords: Password[];

  @OneToMany(() => Category, (category) => category.user, { eager: true })
  categories: Category[];

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.masterPassword);
  }
}
