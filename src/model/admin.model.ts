import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { MstProduct } from './mst.product.model';

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin> {
 
  @Column
  username: string;

  @Column
  password: string;

}
