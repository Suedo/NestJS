import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto;

    const user = new User();
    user.username = username;

    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch (error) {
      console.log(`SQL Error code: ${error.code}`);
      if (error.code === '23505')
        throw new ConflictException('Username already exists');
      else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(dto: AuthCredentialsDto) {
    const { username, password } = dto;
    const user = await this.findOne({ username });
    if (await user.hasValidPassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
