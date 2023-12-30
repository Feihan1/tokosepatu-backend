import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { MstProduct } from './mst.product.model';

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin> {
  @HasMany(() => MstProduct)
product_item: MstProduct[]
   
  @Column
  username: string;

  @Column
  password: string;

}
