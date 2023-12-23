import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin> {
  @Column
  username: string;

  @Column
  password: string;

}
