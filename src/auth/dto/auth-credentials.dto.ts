import {
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MinLength(8)
  @MaxLength(20)
  // regex : https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords must contain AT LEAST 1 uppercase, 1 lowercase letter and 1 number or special character',
  })
  password: string;
}
