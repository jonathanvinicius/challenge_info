import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
/**
 * Pagination parameters default
 */
export class PageOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    description: 'Número da página',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 20,
    description: 'Número de itens por página',
    // maximum: 50,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit: number = 20;

  /**
   * Offset from page
   */
  get offset(): number {
    return (this.page - 1) * this.limit;
  }

  constructor(page?: number, limit?: number) {
    if (page) this.page = page;
    if (limit) this.limit = limit;
  }
}
