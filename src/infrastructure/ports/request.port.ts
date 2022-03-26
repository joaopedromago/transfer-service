import { AxiosResponse } from 'axios';
import {
  BankSettlementRequestDto,
  BankSettlementResponseDto,
} from 'src/modules/transfer/interfaces/dto';

export abstract class BankSettlementPort {
  post: (
    data: BankSettlementRequestDto,
  ) => Promise<AxiosResponse<BankSettlementResponseDto>>;
}
