# Simple REST-API Backend Application

[![Build Status](https://travis-ci.org/sarpisik/typescript-postgres-docker-example-app.svg?branch=master)](https://travis-ci.org/sarpisik/typescript-postgres-docker-example-app)
[![Coverage Status](https://coveralls.io/repos/github/sarpisik/typescript-postgres-docker-example-app/badge.svg?branch=master)](https://coveralls.io/github/sarpisik/typescript-postgres-docker-example-app?branch=master)
[![GitHub license](https://img.shields.io/github/license/sarpisik/typescript-postgres-docker-example-app)](https://github.com/sarpisik/typescript-postgres-docker-example-app/blob/master/LICENSE)

An application serving simple REST-API and crud operations on saved movies and comments related to a movie. It stands on [OMDB API](http://www.omdbapi.com/) and fetches missing details of user entered movie before storing to database.

## Installation

The application build on docker as development environment so you need to have installed [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) in your local environment.

```bash
npm install
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

This app has configured already to CI / CD within [Travis CI](https://travis-ci.org/) and deploy on [Heroku](https://www.heroku.com/). If you like to use it, please visit [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/) and create your own secure key:

```yml
deploy:
  provider: heroku
  api_key:
    secure: your_secure_key
  app: $your_app_name
```

or you can create those variables in your travis dashboard. Also you need to provide a valid [Coveralls](https://coveralls.io/) repo_token for test coverage or you can delete this line if you don't want:

```yml
after_script:
  - COVERALLS_REPO_TOKEN=$coveralls_repo_token npm run coverage
```

### Routes

#### Movie

- GET /movies

  Returns array of stored movies.

- GET /movies/:id

  Returns a movie by passed id.

- POST /movies

  Creates a new movie and returns.

- DELETE /movies/:id

  Deletes the movie by passed id and deletes related comments if exist.

#### Comment

- GET /comments

  Returns array of stored comments.

- GET /comments/:id

  Returns a comment by passed id.

- POST /comments

  Creates a new comment and returns.

- DELETE /comments/:id

  Deletes the comment by passed id.

## License

[MIT](https://github.com/sarpisik/typescript-postgres-docker-example-app/blob/master/LICENSE)
