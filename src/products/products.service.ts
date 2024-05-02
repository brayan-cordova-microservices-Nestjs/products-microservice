import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');
import { envs } from '../config';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  // logger
  private readonly logger = new Logger('Products-Service');
  onModuleInit() {
    this.$connect();
    this.logger.log(
      `${colors.black.bgWhite(envs.typeOfDatabase)} ${colors.white('DATABASE CONNECTED')} ${colors.green('Successfully using')} ${colors.white(envs.typeOfOrm)}`,
    );
  }

  // create a product
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
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
