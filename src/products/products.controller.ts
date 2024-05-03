import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { ValidatorUtil as validatorUtil } from '../utils/validatorUtil';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // create product
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // find All products
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // find One product by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // update product (PATCH)
  @Patch(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException(
            'Invalid input: The ID-parameter must be a number.',
          ),
      }),
    )
    id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    // validate that the updateProductDto does not have null or empty properties
    if (validatorUtil.isUpdateDtoEmpty(updateProductDto)) {
      throw new BadRequestException(
        'No valid update parameters provided, field or fields are empty or null.',
      );
    }

    return this.productsService.update(id, updateProductDto);
  }

  // delete product
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
