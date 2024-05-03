import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { envs } from '../config';
import { PaginationDto } from 'src/common';

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
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  // find All products
  async findAll(paginationDto: PaginationDto) {
    // Pagination using Prisma

    const { page, limit } = paginationDto;

    // Total Pages
    const totalPages = await this.product.count();
    const lastPage = Math.ceil(totalPages / limit);

    // Check if the requested page exceeds the total number of pages
    if (page > lastPage) {
      throw new NotFoundException(
        `The requested page ${page} exceeds the total available pages ${lastPage}.`,
      );
    }

    return {
      data: await this.product.findMany({
        // first page or first position is 0
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        totalPages: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
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
