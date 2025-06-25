import { IsString, MinLength } from 'class-validator';

export default class PaymentCheckoutRequestDTO {
  @IsString()
  @MinLength(4)
  branch: string;
  @IsString()
  @MinLength(1)
  document: string;
  @IsString()
  @MinLength(1)
  version: string;
  @IsString()
  @MinLength(1)
  type: string;
  @IsString()
  @MinLength(1)
  installment: string;
}
