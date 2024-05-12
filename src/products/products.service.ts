import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { envs } from '../config';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

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
  createProduct(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  // find All products
  async findAllProducts(paginationDto: PaginationDto) {
    // Pagination using Prisma

    // Page & Limit
    const { page, limit } = paginationDto;

    // Total Pages
    const totalPages = await this.product.count({ where: { available: true } });

    // Last Pages
    const lastPage = Math.ceil(totalPages / limit);

    // Check if the requested page exceeds the total number of pages
    if (page > lastPage || page < 1) {
      throw new BadRequestException(
        `Invalid Page Number...!!! Page ${page} is out of bounds. Please provide a page number between 1 and ${lastPage}.`,
      );
    }

    return {
      data: await this.product.findMany({
        // first page or first position is 0
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
      }),
      meta: {
        totalPages: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  // find One product by ID
  async findOneProduct(id: number) {
    const product = await this.product.findFirst({
      where: { id, available: true },
    });

    if (!product) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Product with ID-${id}, Not Found...!!!`,
      });
    }

    return product;
  }

  // update product (PATCH)
  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: __, ...data } = updateProductDto;

    await this.findOneProduct(id);

    return this.product.update({
      where: { id },
      data: data,
    });

    // try {
    //   const updatedProduct = await this.product.update({
    //     where: { id, available: true },
    //     data: data,
    //   });
    //   return updatedProduct;
    // } catch (error) {
    //   if (error.code === 'P2025') {
    //     throw new RpcException(`Product with ID-${id}, Not Found...!!!`);
    //   } else {
    //     throw new InternalServerErrorException(
    //       'Failed to update product due to an unexpected error.',
    //     );
    //   }
    // }
  }

  // delete product (HARD DELETE)
  // async remove(id: number) {

  //   await this.findOne(id)

  //    return this.product.delete({
  //    where: { id }
  //    });

  // product = await this.product.update({
  //   where: { id },
  //   data: {
  //     available: false,
  //   },
  // });

  //   return product;
  //   }
  // }

  // delete product (SOFT DELETE USING COLUMN AVAILABLE)
  async removeProduct(id: number) {
    await this.findOneProduct(id);

    const product = await this.product.update({
      where: { id },
      data: {
        available: false,
      },
    });

    return product;

    // try {
    //   // available : 1 = true, 0 = false.
    //   const product = await this.product.findUnique({
    //     where: { id },
    //     select: { available: true },
    //   });
    //   // First check if the product was found
    //   if (!product) {
    //     throw new RpcException(`Product with ID-${id}, Not Found...!!!`);
    //   }
    //   // Mark the product as unavailable.
    //   const deletedProduct = await this.product.update({
    //     where: { id },
    //     data: { available: false },
    //   });
    //   return deletedProduct;
    // } catch (error) {
    //   if (error instanceof RpcException) {
    //     // Unexpected errors
    //     throw error;
    //   } else {
    //     throw new InternalServerErrorException(
    //       'Failed to delete product due to an unexpected error.',
    //     );
    //   }
    // }
  }

  // Validate if product exists
  async validateProduct(ids: number[]) {
    ids = Array.from(new Set(ids)); //Set is a type of data structure in javascript without duplicates.

    const products = await this.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // verify if all ids exist
    if (products.length !== ids.length) {
      throw new RpcException({
        message: 'Some products were Not Found...!!!',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return products;
  }
}
