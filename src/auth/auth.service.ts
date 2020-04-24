import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.repository.signUp(dto);
  }

  async allowLogin(dto: AuthCredentialsDto) {
    const username = await this.repository.validatePassword(dto);

    if (!username) {
      throw new UnauthorizedException('Incorrect credentials');
    }
  }
}
