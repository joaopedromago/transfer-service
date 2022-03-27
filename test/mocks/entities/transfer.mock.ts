import { Transfer, TransferDocument } from 'src/modules/transfer/core/domain';
import { TransferDto } from 'src/modules/transfer/interfaces/dto';

export const transferDtoMock = new TransferDto();
transferDtoMock.externalId = 'mocked1';
transferDtoMock.amount = 10000;
transferDtoMock.expectedOn = new Date(1671148800000);

export const transferMock = new Transfer(transferDtoMock);

export const transferDocumentMock = new Transfer(
  transferDtoMock,
) as TransferDocument;

transferDocumentMock._id = 'mockedMongoId';

export const oldDateTransferDocumentMock = new Transfer(
  transferDtoMock,
) as TransferDocument;
transferDocumentMock._id = 'mockedMongoId';
oldDateTransferDocumentMock.expectedOn = new Date(1580601600000);
