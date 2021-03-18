# Pokemon Trainer API

## Requirements

Node v12+
Docker


## Installation

```bash
$ npm install
```

## Setting environment for development

### Setting environment variables
Create a copy of .env.example and rename it to .env
Change variables if needed

### Running db for development
```bash
# development
$ docker-compose up -d
```

## Running the app for development

```bash
# development
$ npm run start

OR

# watch mode
$ npm run start:dev
```

## Swagger
Swagger enabled on http://localhost:3000/swagger

## Test

```bash
# unit tests
$ npm run test
```

## Building docker image
```bash
$ docker-compose -f docker-compose.prod.yaml build
```

## Running app for production on docker
```bash
$ docker-compose -f docker-compose.prod.yaml up -d 
```
