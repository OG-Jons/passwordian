import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, (user) => user.passwords)
  user: User;

  @ManyToOne(() => Category, (category) => category.passwords, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  category: Category;
}
