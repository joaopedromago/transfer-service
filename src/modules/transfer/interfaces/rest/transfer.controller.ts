import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { appRoutes } from 'src/infrastructure/config';
import { TransferDto } from 'src/modules/transfer/interfaces/dto';
import { Response } from 'express';
import { CreateTransferService } from 'src/modules/transfer/core/services';
import {
  expectedDateCreationError,
  processingCreationResult,
  createdResult,
} from 'src/modules/transfer/interfaces/responses';
import { TransferRequestStatus } from 'src/shared/enums';

@ApiTags('Transfers')
@Controller(appRoutes.transfer._)
export class TransferController {
  constructor(private readonly createTransferService: CreateTransferService) {}

  @ApiOperation({ summary: 'Efetuar Transferência' })
  @ApiResponse(createdResult)
  @ApiResponse(processingCreationResult)
  @ApiResponse(expectedDateCreationError)
  @Post()
  async create(@Body() payload: TransferDto, @Res() res: Response) {
    const result = await this.createTransferService.create(payload);

    if (result === TransferRequestStatus.PROCESSING) {
      return res
        .status(processingCreationResult.status)
        .send(processingCreationResult.description);
    }

    return res.status(createdResult.status).send(createdResult.description);
  }
}
