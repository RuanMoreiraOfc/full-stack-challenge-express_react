<h1 align='center'>
Fullstack Challenge 🏅 - Dictionary
</h1>

## About

Dictionary Fullstack Application, with user history and favorites route.

> This is a challenge by Coodesh

- Frontend [:eye: Preview][btn-frontend-preview]

  - if link above broke [:eye: Preview][btn-frontend-preview-mirror]

- Backend [:eye: Preview][btn-backend-preview]

## Technologies

### Frontend ~18h

- [Vite]
- [React]
- [ChakraUi]
- [React Router DOM]
- [Axios]
- [JsCookie]

### Backend ~15h

- [Node]
- [Prisma]
- [Express]
- [Express async errors]
- [Axios]
- [Bcrypt]
- [JsonWebToken]
- [Swagger Ui Express]

## Do it Yourself

I had problems setting up the Dockerfile, for some reason, so it will have to be done locally!

First of all verify if you have this applications installed on your pc!

- [Node][btn-node]
- [Git][btn-git]
- [Postgres][btn-db] [Optional]

Obs.: you can create a postgres container in [railway][btn-railway]

1.  clone the project from the [repository][btn-repo]
    ```bash
         git clone https://github.com/ruanmoreiraofc/full-stack-challenge-express+react.git ruan_challenge
    ```
2.  open your terminal and run this command
    - open the project folder
      ```bash
          cd ruan_challenge/backend
      ```
      in another terminal
      ```bash
          cd ruan_challenge/frontend
      ```
    - build the project
      ```bash
          npm ci
      ```
    - create a file `.env` in same shape as `.env.example`
    - run the project
      ```bash
          npm run dev
      ```

## Routes

### Frontend

- **[GET] /**
- **[GET] /signin**
- **[GET] /signup**

#### Needs token

- **[GET] /view**

### Backend

- **[GET] /api-docs**
  Only 2 routes documented
- **[GET] /**
- **[POST] /auth/signup**
  {
  "name": "User 1",
  "email": "example@email.com",
  "password": "test"
  }
- **[POST] /auth/signin**
  {
  "email": "example@email.com",
  "password": "test"
  }

#### Needs token

- **[GET] /entries/en**
- **[GET] /entries/en?search=fire&limit=4&page=1**
- **[GET] /entries/en/:word**
- **[POST] /entries/en/:word/favorite**
- **[DELETE] /entries/en/:word/unfavorite**
- **[GET] /user/me**
- **[GET] /user/me/history?limit=4&page=1**
- **[GET] /user/me/favorites?limit=4&page=1**

<!-- VARIABLES -->

[btn-railway]: https://railway.app/new
[btn-db]: https://www.postgresql.org/download/
[btn-git]: https://git-scm.com/downloads
[btn-node]: https://nodejs.org/en/download/
[btn-repo]: https://github.com/ruanmoreiraofc/full-stack-challenge-express+react
[btn-backend-preview]: https://fullstack-challenge-api.ruanmoreira.com
[btn-frontend-preview]: https://fullstack-challenge.ruanmoreira.com
[btn-frontend-preview-mirror]: https://fullstack-challenge-2022.netlify.app

<!-- TECHNOLOGIES -->

[axios]: https://github.com/axios/axios
[vite]: https://github.com/vitejs/vite
[react]: https://github.com/facebook/react
[chakraui]: https://github.com/chakra-ui/chakra-ui
[react router dom]: https://github.com/remix-run/react-router
[jscookie]: https://github.com/js-cookie/js-cookie
[node]: https://github.com/nodejs/node
[prisma]: https://github.com/prisma/prisma
[express]: https://github.com/expressjs/express
[express async errors]: https://github.com/davidbanham/express-async-errors
[bcrypt]: https://github.com/kelektiv/node.bcrypt.js
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
[swagger ui express]: https://github.com/scottie1984/swagger-ui-express
