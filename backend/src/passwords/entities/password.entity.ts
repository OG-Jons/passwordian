import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  website: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.passwords)
  user: User;
}
