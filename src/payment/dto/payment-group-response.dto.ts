import { PaymentDTO } from './payment-dto';

export default class PaymentGroupResponseDTO {
  groupId: string;
  description: string;
  orders: PaymentDTO[];
}
