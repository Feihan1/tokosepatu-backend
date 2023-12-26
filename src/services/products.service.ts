import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import   axios from "axios";
import { CreateMstProduct } from "src/interfaces/admin.interface";
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
      const products = await this.Product.findAll();
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
}

// async uploadImageToImgur(fileBuffer: Buffer): Promise<string> {
//   const imgurApiEndpoint = 'https://api.imgur.com/3/image';
//   const clientId = 'f4b1ab3e14efe69'; // Ganti dengan Client ID Imgur Anda

//   try {
//     console.log("Tahap 1")
//     const response = await axios.post(
//       imgurApiEndpoint,
//       {
//         image: fileBuffer, // Ubah buffer menjadi base64
//       },
//       {
//         headers: {
//           Authorization: `Client-ID ${clientId}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     console.log("Tahap 2")
//     const imageUrl = response.data.data.link;
//     return imageUrl;

//   } catch (error) {
    
//     console.error('Failed to upload image to Imgur:', error);
//     throw new Error('Failed to upload image to Imgur');
//   }
// }
