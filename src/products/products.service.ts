import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  // create product
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  // find All products
  findAll() {
    return `This action returns all products`;
  }

  // find One product by ID
  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update product (PATCH)
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  // delete product
  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
