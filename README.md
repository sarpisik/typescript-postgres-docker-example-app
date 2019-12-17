# Simple REST-API Backend Application

[![Build Status](https://travis-ci.org/sarpisik/typescript-postgres-docker-example-app.svg?branch=master)](https://travis-ci.org/sarpisik/typescript-postgres-docker-example-app)
[![Coverage Status](https://coveralls.io/repos/github/sarpisik/typescript-postgres-docker-example-app/badge.svg?branch=master)](https://coveralls.io/github/sarpisik/typescript-postgres-docker-example-app?branch=master)

## Usage

The application serving simple REST-API and crud operations on saved movies and comments related to a movie. It stands on [OMDB API](http://www.omdbapi.com/) and fetches missing details of user entered movie before storing to database.

## Installation

I use docker as development environment so you need to have installed [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) in your local environment.

```bash
npm i
```

## Usage

### Development:

Please change the belows files names and edit your own credentials.

- .env.docker => docker.env

- .env.local => .env

Then run,

```bash
docker-compose up --build
```

and server is ready on: [http://localhost:8080/](http://localhost:8080/)

### Production

This app has configured already to CI / CD within [Travis CI](https://travis-ci.org/) and deploy on [Heroku](https://www.heroku.com/). If you like to use it, please open .travis.yml file and change belows fields:

```yml
deploy:
  provider: heroku
  api_key:
    secure: $your_secure
  app: $your_app_name
```

or you can create those variables in your travis dashboard. Also you need to provide a valid [Coveralls](https://coveralls.io/) repo_token for test coverage or you can delete this line if you don't want:

```yml
after_script:
  - COVERALLS_REPO_TOKEN=$coveralls_repo_token npm run coverage
```
