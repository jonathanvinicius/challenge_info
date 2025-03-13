import { ResponseErrorMessage } from '@app/domain/responses';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiErrorResponse = () => {
  return applyDecorators(
    ApiExtraModels(ResponseErrorMessage),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid parameters',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Bussiness rule',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Forbidden',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_GATEWAY,
      description: 'Invalid response',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(ResponseErrorMessage),
          },
        },
      },
    }),
  );
};
