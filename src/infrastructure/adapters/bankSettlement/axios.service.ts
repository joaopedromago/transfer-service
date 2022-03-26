import { Injectable, Provider } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Agent as AgentHttp } from 'http';
import { Agent as AgentHttps } from 'https';
import { env } from 'src/infrastructure/config';
import { BankSettlementPort } from 'src/infrastructure/ports';
import { Transfer } from 'src/modules/transfer/core/domain';
import {
  BankSettlementRequestDto,
  BankSettlementResponseDto,
} from 'src/modules/transfer/interfaces/dto';

@Injectable()
export class BankSettlementAxiosAdapter implements BankSettlementPort {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.BANK_SETTLEMENT_URL,
      httpAgent: new AgentHttp(),
      httpsAgent: new AgentHttps({
        rejectUnauthorized: false,
      }),
    });
  }

  async post(
    data: BankSettlementRequestDto,
  ): Promise<AxiosResponse<BankSettlementResponseDto>> {
    return this.client.post('/paymentOrders', data);
  }

  async get(internalId: string): Promise<AxiosResponse<Transfer>> {
    return this.client.get(`/paymentOrders/${internalId}`);
  }
}

export const BankSettlementProvider: Provider<BankSettlementPort> = {
  provide: BankSettlementPort,
  useClass: BankSettlementAxiosAdapter,
};
