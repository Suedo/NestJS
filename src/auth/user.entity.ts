import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  tasks: Task[];

  async hasValidPassword(password: string): Promise<boolean> {
    const pw = await bcrypt.hash(password, this.salt);
    console.log(
      `entered password: ${password}, DB: ${this.password}, computedHash: ${pw}`,
    );
    return pw === this.password;
  }
}
