import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Password } from '../../passwords/entities/password.entity';
import { User } from '../../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Password, (password) => password.category, {
    onDelete: 'SET NULL',
  })
  passwords: Password[];

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, (user) => user.categories, {
    onDelete: 'CASCADE',
  })
  user: User;

  constructor(name: string, user?: User) {
    this.name = name;
    this.user = user;
  }
}
