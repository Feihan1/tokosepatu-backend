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
    item_code: string;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_brand: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_category: string;

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
    item_gender: string;

  
    @Column({
        type: DataType.STRING,
        allowNull: true,
      })
      item_image_url: string; 

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    }) 

    active: boolean;
}
