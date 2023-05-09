# Marvelous Todo - Server

[![Nest.js](https://img.shields.io/badge/framework-Nest.js-brightgreen)](https://nestjs.com/) [![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org/) [![Prisma](https://img.shields.io/badge/ORM-Prisma-orange)](https://www.prisma.io/) [![MongoDB](https://img.shields.io/badge/database-MongoDB-green)](https://www.mongodb.com/) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Marvelous Todo is a simple yet powerful backend server for a todo app built with Nest.js, fully written in TypeScript. The server uses Prisma as an ORM over MongoDB.

## Prerequisites

- Node.js (v14+)
- Yarn package manager (v1+)

## Configuration

Create a `.env` file in the root directory of the project with the following variables:

```bash
DATABASE_URL="your_database_connection_url"
CLIENT_HOST="your_client_host"
```

### Optional environment variables

```bash
NODE_ENV="development|production|test|provision"
PORT="your_preferred_port"
```

## Installation

Run the following command to install the dependencies:

```bash
npm install
```

## Usage

To start using the Marvelous Todo backend server, follow these steps:

### 1. Install dependencies

Install the required dependencies by running the following command:

```bash
yarn install
```

### 2. Launch the server

#### Development mode

To start the server in development mode, run the following command:

```bash
yarn dev
```

#### Production mode

To start the server in production mode, first build the project by running:

```bash
yarn build
```

Then, start the server by running:

```bash
yarn start
```

### 3. Use provided scripts for various tasks

The project includes several helpful scripts for managing the database, formatting the code, and linting. To use these scripts, run the following commands:

- Update Prisma typing: `yarn db:generate`
- Merge Prisma schema files: `yarn db:merge`
- Push Prisma schema to the database: `yarn db:push`
- Format the codebase: `yarn format`
- Lint the codebase: `yarn lint`

### 4. Interact with the API

The server provides several API routes for managing todos. Below is a description of the Data Transfer Objects (DTOs) used to interact with these routes:

- Create a new todo: `POST /api/todos`
  DTO for todo creation:
  - `title` (string, required): The title of the todo item.
  - `isFinished` (boolean, optional): Indicates whether the todo is finished or not.
  - `createdAt` (Date, optional): The date and time the todo was created.
  - `finishedAt` (Date, optional): The date and time the todo was marked as finished.
- Retrieve all todos: `GET /api/todos` (with optional filters)
  Filter DTO for fetching todos:
  - `id` (string, optional): The id of specific todo item.
  - `title` (string, optional): The title of the todo item.
  - `isFinished` (boolean, optional): Indicates whether the todo is finished or not.
  - `createdAt` (Date, optional): The date and time the todo was created.
  - `finishedAt` (Date, optional): The date and time the todo was marked as finished.
  - `isFinished` (boolean, optional): Filter todos based on their completion status.
  - `take` (number, optional): The number of todos to retrieve.
  - `skip` (number, optional): The number of todos to skip before starting to retrieve.
- Update a todo: `PATCH /api/todos/:id`
  DTO for updating a todo:
  - `title` (string, optional): The new title for the todo item.
  - `isFinished` (boolean, optional): Update the completion status of the todo.
  - `createdAt` (Date, optional): Update the date and time the todo was created.
  - `finishedAt` (Date, optional): Update the date and time the todo was marked as finished.
- Delete todos with filters: `DELETE /api/todos` (with optional filters or wipe out all todos)
  Filter DTO for deleting todos the same as for `GET /api/todos`

For other routes like `GET /api/todos/:id` and `DELETE /api/todos/:id`, you don't need a DTO. Just provide the todo ID as a path parameter.

### 5. Explore the demo and repository

The demo app is deployed on the Heroku platform and can be accessed at: [Heroku](https://marvelous-todo.herokuapp.com)

The codebase can be found at: [GitHub repository](https://github.com/Geebrox/marvelous-todo-server)

## Contributing

Feel free to submit issues or pull requests, and make sure to follow the existing code style and formatting.

## License

This project is licensed under the MIT License.
