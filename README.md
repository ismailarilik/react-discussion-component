# react-discussion-component [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A discussion component to place below the articles

## Requirements

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/current/)
- [MySQL](https://www.mysql.com/)

## Preparing

- Clone the repo from GitHub: `git clone https://github.com/ismailarilik/react-discussion-component.git`
- Install dependencies using npm: `npm install`
- Start MySQL server: `sudo systemctl start mysql.service`
- Create DB: `npm run db:create`
- Run migrations: `npm run db:migrate`
- Build CSS using Tailwind CSS: `npm run build-css`

## Run the example app

```sh
npm start
```

Then navigate to [http://localhost:3000](http://localhost:3000).

## Debug the example app

Build and watch CSS using Tailwind CSS:

```sh
npm run build-css:dev
```

Start the server in development mode:

```sh
npm run debug
```

Then navigate to [http://localhost:3000](http://localhost:3000).

## Run linter

```sh
npm run lint
```

## Run tests

```sh
npm run unittest
```

## Run both linter and tests

```sh
npm test
```

## Attributions

Avatars are exported from [https://vue-nice-avatar.vercel.app/](https://vue-nice-avatar.vercel.app/).
