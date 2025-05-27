import { Expose, Transform } from 'class-transformer';

export class PaymentDTO {
  @Expose({ name: 'RECE1' })
  id: number;

  @Expose({ name: 'EMPRESA' })
  branch: string;

  @Expose({ name: 'NOMEEMP' })
  branchDescription: string;

  @Expose({ name: 'NUMERO' })
  document: string;

  @Expose({ name: 'SERIE' })
  version: string;

  @Expose({ name: 'PARCELA' })
  installment: string;

  @Expose({ name: 'TIPO' })
  type: string;

  @Expose({ name: 'CODBARRAS' })
  barcode: string;

  @Expose({ name: 'LINDIG' })
  digcode: string;

  @Expose({ name: 'EMISSAO' })
  @Transform(({ value }) => (value ? new Date(value as Date).toLocaleDateString('pt-BR') : ''))
  date: string;

  @Expose({ name: 'VENCTO' })
  @Transform(({ value }) => (value ? new Date(value as Date).toLocaleDateString('pt-BR') : ''))
  invoiceDate: string;

  @Expose({ name: 'VENCREA' })
  @Transform(({ value }) => (value ? new Date(value as Date).toLocaleDateString('pt-BR') : ''))
  invoiceWorkingDate: string;

  @Expose({ name: 'PAGAMENTO' })
  @Transform(({ value }) => (value ? new Date(value as Date).toLocaleDateString('pt-BR') : ''))
  paymentDate: string;

  @Expose({ name: 'VALOR' })
  amount: number;

  @Expose({ name: 'PRODUTO' })
  product: string;

  @Expose({ name: 'QUANTIDADE' })
  quantity: number;

  @Expose({ name: 'SALDO' })
  balance: number;

  @Expose({ name: 'SITUACAO' })
  status: string;

  @Expose()
  image: string;
}
