import { Queue, QueueDocument } from 'src/modules/pendingQueue/core/domain';

export const queueMock = new Queue('mockedTransferId');

export const queueDocumentMock = new Queue('mockedTransferId') as QueueDocument;
queueDocumentMock._id = 'mockedMongoId';
