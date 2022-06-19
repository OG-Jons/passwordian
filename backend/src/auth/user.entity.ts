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

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  masterPassword: string;

  @Column()
  salt: string;

  @OneToMany(() => Password, (password) => password.user, { eager: true })
  passwords: Password[];

  @OneToMany(() => Category, (category) => category.user, { eager: true })
  categories: Category[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.masterPassword;
  }
}
