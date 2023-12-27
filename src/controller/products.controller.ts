import { Controller, Post, Res, Body, Get, Param, UploadedFile, UseInterceptors, Put, Patch, Delete } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { CreateMstProduct, UpdateProductDto } from "src/interfaces/admin.interface";
import { ProductService } from "src/services/products.service";

@ApiTags("Admin Product Management")
@Controller("/admin/product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMstProduct: CreateMstProduct,
  ): Promise<any> {
    try {
      const imageUrl = await this.productService.uploadImageAndCreateProduct(file.buffer, createMstProduct);
      return { message: 'Product created successfully', imageUrl };
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Error creating product');
    }
  }

  @Get("/list")
  async getAllProducts(@Res() res): Promise<any> {
    try {
      const products = await this.productService.getAllProducts();
      return res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Whoops. Error Occurred",
      });
    }
  }

@Patch('/update/:id')
async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) : Promise<any> {

  try {
   const newProduct = await this.productService.updateProduct(id, updateProductDto);
   
   return { message: 'Product Updated Successfully', newProduct };
  }
  catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
}

@Delete('/delete/:id')
async deleteProduct(@Param('id') id: string) {
  return this.productService.deleteProduct(id);
}

@Get('/transaction-list')
async readTransaction (@Res()res) : Promise<any> {
const response = await this.productService.readTransactionList();
  res.status(200).json({ message: "Sukses",data:response });
}
}