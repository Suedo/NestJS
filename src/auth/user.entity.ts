import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async hasValidPassword(password: string): Promise<boolean> {
    const pw = await bcrypt.hash(password, this.salt);
    console.log(
      `entered password: ${password}, DB: ${this.password}, computedHash: ${pw}`,
    );
    return pw === this.password;
  }
}
