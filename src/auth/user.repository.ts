import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto;

    const user = new User();
    user.username = username;
    user.password = password;
    user.save();

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
}
