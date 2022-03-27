/* eslint-disable */
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mockserver/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  if (req.method === 'POST' && req.url === '/paymentOrders') {
    const randomResponse = Math.floor(Math.random() * 4);

    const response = {
      internalId: 'mocked123',
    };

    switch (randomResponse) {
      case 0:
        response.status = 'CREATED';
        break;
      case 1:
        response.status = 'APPROVED';
        break;
      case 2:
        response.status = 'SCHEDULED';
        break;
      case 3:
        response.status = 'REJECTED';
        break;
    }

    res.json(response);
  } else {
    next();
  }
});

server.use(router);

server.listen(5000, () => {
  console.log('mockserver is running');
});
