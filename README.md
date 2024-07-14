

## Description

Redis framework implamentation

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
```

## Run Database

```bash
# setup image
$ docker pull redis

# setup container example
$ docker run --name learning-redis -it -p 6379:6379 -d redis redis-server --requirepass learning-redis
