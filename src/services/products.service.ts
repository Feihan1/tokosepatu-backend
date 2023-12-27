import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import   axios from "axios";
import { CreateMstProduct, UpdateProductDto } from "src/interfaces/admin.interface";
import { MstProduct } from "src/model/mst.product.model";


@Injectable()
export class ProductService {

  constructor(
    @InjectModel(MstProduct) private Product: typeof MstProduct,
    private httpService: HttpService
  ) {}

  async createProduct(payload: CreateMstProduct): Promise<any> {
    return await this.Product.create(payload);
  }

  async getAllProducts(): Promise<any> {
    try {
      const products = await this.Product.findAll({order: [['id', 'ASC']]});
      for (const product of products) {
        // Jika item_qty sama dengan 0, atur active menjadi false
        if (product.item_qty === 0) {
          product.active = false;
        }
        if (product.item_qty !== 0) {
          product.active = true
        }
      }
      return products;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }

  

   async uploadImageToImgur(file: Buffer): Promise<string> {
    try {

      const imgurApiEndpoint = 'https://api.imgur.com/3/image';
      const clientId = 'f4b1ab3e14efe69'; // Ganti dengan Client ID Imgur Anda



      const response = await axios.post(
        imgurApiEndpoint,
        {
          image: file,
        },
        {
          headers: {
            Authorization: `Client-ID ${clientId}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response.data.data.link;
      console.log(imageUrl)
      return imageUrl;
 
    } catch (error) {
      console.error('Failed to upload image to Imgur:', error);
      throw new Error('Failed to upload image to Imgur');
    }
  }

 async uploadImageAndCreateProduct(file: Buffer,createMstProduct: CreateMstProduct ): Promise<any> {
    const imageUrl = await this.uploadImageToImgur(file);
    console.log(imageUrl)
    return await this.Product.create({ ...createMstProduct, item_image_url: imageUrl });
  }

  
  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<MstProduct> {
    const product = await this.Product.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.item_qty !== undefined) {
      product.item_qty = updateProductDto.item_qty;
     
    }

    if (updateProductDto.item_amount !== undefined) {
      product.item_amount = updateProductDto.item_amount;
    }


    await product.save(); // Menyimpan perubahan ke dalam basis data menggunakan model

    return product;
  }

  async deleteProduct(id: string): Promise<any> {
    const product = await this.Product.findByPk(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await product.update({ item_qty: 0} ,  { where: { id } });

    return 'Produk Telah Di Hapus Untuk User';
}
}