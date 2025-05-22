import { Expose } from 'class-transformer';

export class OrderDTO {
  @Expose({ name: 'RECD2' })
  id: number;

  @Expose({ name: 'EMPRESA' })
  branch: string;

  @Expose({ name: 'DOCUMENTO' })
  document: string;

  @Expose({ name: 'SERIE' })
  version: string;

  @Expose({ name: 'PRODUTO' })
  product: string;

  @Expose({ name: 'DESCRICAO' })
  description: string;

  @Expose({ name: 'ITEM' })
  item: string;

  @Expose({ name: 'QUANTIDADE' })
  quantity: number;

  @Expose({ name: 'PRECO' })
  price: number;

  @Expose({ name: 'TOTAL' })
  total: number;

  @Expose()
  image: string;
}
