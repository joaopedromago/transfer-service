import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { appRoutes } from 'src/infrastructure/config';
import { TransferDto } from 'src/modules/transfer/interfaces/dto';
import { Response } from 'express';

@ApiTags('Transfers')
@Controller(appRoutes.transfer._)
export class TransferController {
  constructor() {
    // TODO: add instance to transfer services
  }

  @ApiOperation({ summary: 'Efetuar Transferência' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A transferência foi salvo com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.PROCESSING,
    description: 'A transferência está processando.',
  })
  @Post()
  create(@Body() payload: TransferDto, @Res() res: Response) {
    // TODO: call create transfer service
    res.status(HttpStatus.CREATED).send();
  }
}
