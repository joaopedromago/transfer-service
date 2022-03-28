## Descrição

Api para um serviço de transferência, desenvolvida em [Node](https://nodejs.org/en/about/) utilizando o framework [Nest](https://github.com/nestjs/nest) e o banco de dados [MongoDB](https://www.mongodb.com).

## Como rodar
Antes de tudo é recomendado definir suas variáveis de ambiente.
Você pode pegar exemplos do arquivo [.env.sample](.env.sample)

Api do serviço de transferência

```bash
yarn
yarn start
```

Servidor mock da plataforma de liquidação do banco
```bash
yarn mockserver
```

## Testes unitários

```bash
# unit tests
$ yarn test

# test coverage
$ npm run test:cov
```

## Sistema

O sistema segue um padrão de arquitetura limpa e possui dois módulos:

- transfer: Este módulo é responsável pelo serviço de transferência, definindo uma interface REST e os serviços de armazenamento e processo da transferência.
- pendingQueue: Este módulo é responsável pela dead letter queue, a fila de execução que irá realizar re-tentativas de processamento de transferências falhadas.

Está todo documentado utilizando [Swagger](https://swagger.io/).

Variáveis de ambiente

| Nome     | Descrição |
| ----------- | ----------- |
| PORT | Define em qual porta o serviço http da aplicação irá executar |
| BANK_SETTLEMENT_URL | Define a url da plataforma de liquidação do banco |
| MONGO_URL | Define a url de conexão com o mongoDB |
| EXECUTE_PENDING_QUEUE_CRON | Define, através de uma expressão CRON, qual o intervalo de execução que a fila de pendências irá executar |