import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';
/**
 * Response page for pagination
 */
export class PageDto<T> {
  /**
   * Results data request
   */
  @ApiProperty({ isArray: true, type: Object })
  readonly data: T[];

  /**
   * Pagination details
   */
  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
