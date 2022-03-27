import { Queue, QueueDocument } from 'src/modules/pendingQueue/core/domain';

export const queueMock = new Queue();
queueMock.transferId = 'mockedTransferId';

export const queueDocumentMock = { ...queueMock } as QueueDocument;
queueDocumentMock._id = 'mockedMongoId';
