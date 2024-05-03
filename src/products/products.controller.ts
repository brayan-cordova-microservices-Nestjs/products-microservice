import { Controller, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { ValidatorUtil as validatorUtil } from '../utils/validator.util';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // create product
  // @Post()
  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // find All products
  // @Get()
  @MessagePattern({ cmd: 'find_all_products' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // find One product by ID
  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // update product (PATCH)
  // @Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  async update(@Payload() updateProductDto: UpdateProductDto) {
    //   'id', // @Param(
    //   new ParseIntPipe({
    //     exceptionFactory: () =>
    //       new BadRequestException(
    //         'Invalid Input: The id-Parameter must be a number.',
    //       ),
    //   }),
    // )
    // id: number,
    // @Body() updateProductDto: UpdateProductDto,

    // validate that the updateProductDto does not have null or empty properties
    if (validatorUtil.isUpdateDtoEmpty(updateProductDto)) {
      throw new BadRequestException(
        'No valid update parameters provided, field or fields are empty or null.',
      );
    }

    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // delete product
  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
