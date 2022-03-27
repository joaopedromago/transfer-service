import { Transfer, TransferDocument } from 'src/modules/transfer/core/domain';
import { TransferDto } from 'src/modules/transfer/interfaces/dto';

export const transferDtoMock = new TransferDto();
transferDtoMock.externalId = 'mocked1';
transferDtoMock.amount = 10000;
transferDtoMock.expectedOn = new Date(1639526400000);

export const transferMock = new Transfer(transferDtoMock);

export const transferDocumentMock = { ...transferMock } as TransferDocument;
transferDocumentMock._id = 'mockedMongoId';
