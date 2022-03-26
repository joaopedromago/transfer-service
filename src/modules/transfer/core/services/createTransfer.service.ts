import { Injectable, Logger } from '@nestjs/common';
import { TransferRepositoryPort } from 'src/infrastructure/ports';
import { Transfer } from 'src/modules/transfer/core/domain';
import { ProcessTransferService } from 'src/modules/transfer/core/services/processTransfer.service';
import { TransferDto } from 'src/modules/transfer/interfaces/dto';

@Injectable()
export class CreateTransferService {
  private readonly logger = new Logger(CreateTransferService.name);

  constructor(
    private readonly transferRepository: TransferRepositoryPort,
    private readonly processTransferService: ProcessTransferService,
  ) {}

  async create(transferDto: TransferDto): Promise<Transfer | undefined> {
    this.logger.verbose(`Creating transfer ${JSON.stringify(transferDto)}`);

    const transfer = await this.transferRepository.save(
      new Transfer(transferDto),
    );

    return this.processTransferService.process(transfer);
  }
}
