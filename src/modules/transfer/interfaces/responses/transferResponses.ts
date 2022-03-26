import { HttpStatus } from '@nestjs/common';

export const expectedDateCreationError = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Transferência fora da data de vencimento.',
};

export const rejectedTransfer = {
  status: HttpStatus.BAD_REQUEST,
  description: 'A transferência foi rejeitada.',
};

export const processingCreationResult = {
  status: HttpStatus.PROCESSING,
  description: 'A transferência está processando.',
};

export const createdResult = {
  status: HttpStatus.CREATED,
  description: 'A transferência foi salva com sucesso.',
};
