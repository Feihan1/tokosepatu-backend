import { DataType, Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { OrderCart } from './cart.model';
import { MstProduct } from './mst.product.model';

@Table({tableName: "product_sales"})
export class ProductSales extends Model<ProductSales> {
    
//===================DATABASE RELATION=====================================

    @BelongsTo(() => OrderCart, {
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        hooks: true
    })
    cart_detail: OrderCart

    @ForeignKey(() => OrderCart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cart_id:number
    
    @BelongsTo(() => MstProduct, {
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        hooks: true
    })
    product_detail: MstProduct

    @ForeignKey(() => MstProduct)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    product_id:number

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

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_size:number;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_image: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_code: string;
}
