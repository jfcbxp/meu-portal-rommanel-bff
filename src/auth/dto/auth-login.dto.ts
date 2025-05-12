import { MinLength, IsString } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  @MinLength(11)
  id: string;
}
