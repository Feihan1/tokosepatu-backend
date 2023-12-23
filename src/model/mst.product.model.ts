import { DataType, Column, Model, Table, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { OrderCart } from './cart.model';
import { ProductSales } from './product.sales.model';

@Table({tableName: "mst_product"})
export class MstProduct extends Model<MstProduct> {
    
//===================DATABASE RELATION=====================================
@HasMany(() => ProductSales)
product_item: ProductSales[]
   

 
//===================DATABASE RELATION=====================================
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    item_qty: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    item_amount: number;

    // @Column({
    //     type: DataType.STRING,
    //     allowNull: false
    // })
    // item_image: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_code: string;
}
