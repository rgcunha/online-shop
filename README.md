# Online shop

## Dependencies

- Node 14.3.0
- NPM 6.14.4
- Docker

## Install

```sh
nvm install # installs node version specified in .nvmrc
cp .env.example .env
npm install
```

## Setup dependencies

```sh
docker-compose up
npm run db:seeds
```

## Start

The server runs on port `8100` by default unless a different value is specified in `PORT` env variable.

```sh
npm start
```

## Run everything locally

Make sure to create an `.env` file from the `.env.example` and add the needed values.

```
docker-compose up
```

## Testing

To run unit and integration tests:

```sh
npm test
```

To run e2e tests:

```sh
npm run test:e2e:local
npm run test:e2e:prod
```

## Linting

```sh
npm run lint
```
