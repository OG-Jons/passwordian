import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Password } from '../../passwords/entities/password.entity';
import { User } from '../../auth/user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Password, (password) => password.category)
  passwords: Password[];

  @ManyToOne(() => User, (user) => user.categories)
  user: User;
}
