import { MinLength, IsString, IsJWT } from 'class-validator';

export class AuthResetDTO {
  @IsJWT()
  token: string;

  @IsString()
  @MinLength(6)
  password: string;
}
