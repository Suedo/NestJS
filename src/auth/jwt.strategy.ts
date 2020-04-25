import { PassportStrategy } from '@nestjs/passport'; // nstjs' passport wrapper
import { Strategy, ExtractJwt } from 'passport-jwt'; // passport's jwt strategy
import { JwtPayload } from './jwt-payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mysecret',
    });
  }

  // this method must exist for all strategy
  async validate(payload: JwtPayload): Promise<User> {
    // whatever we return from this method is going to be injected into the request for the protected route

    const { username } = payload;
    const user = await this.userRepo.findOne(username);

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    return user;
  }
}
