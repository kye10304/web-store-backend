# Web Store API

REST API for a simple online store: user authentication, product browsing, balance top-ups, and order checkout with role-based access (`user` / `admin`).

## Tech stack

- **Node.js** + **Express 5**
- **PostgreSQL** + **Sequelize** ORM
- **JWT** authentication + **bcrypt** password hashing
- **Joi** request validation
- **Swagger** (`/api-docs`)
- **Jest** + **Supertest** for tests
- **Docker Compose** for local Postgres

## Features

- Register and login (JWT)
- List products with optional category filter and pagination (`food`, `electronics`)
- Deposit funds and check balance
- Place orders (checkout), pay for orders, and update order status (admin)
- Layered structure: routes → controllers → services → repositories → models

## Prerequisites

- Node.js (LTS recommended)
- Docker (for PostgreSQL), or your own Postgres instance

## Getting started

### 1. Clone and install

```bash
git clone <repository-url>
cd "1. Web Store project"
npm install
```

### 2. Start the database

```bash
docker compose up -d
```

This starts Postgres on port **5433** with:

| Variable | Value |
|---|---|
| User | `retailprocure` |
| Password | `retailprocure_password` |
| Database | `retailprocure` |

### 3. Environment variables

The app loads `.env.${NODE_ENV}` (defaults to `development`). Create `.env.development` in the project root:

```env
PORT=3000
NODE_ENV=development

DB_NAME=retailprocure
DB_USER=retailprocure
DB_PASSWORD=retailprocure_password
DB_HOST=localhost
DB_PORT=5433
DB_DIALECT=postgres

JWT_SECRET=your_jwt_secret
```

For tests, create `.env.test` with the same shape (pointing at a test database if you prefer).

### 4. Run the server

```bash
npm start
```

The API listens on `http://localhost:3000` (or the `PORT` you set).

Interactive API docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | — | Welcome message |
| `POST` | `/auth/register` | — | Register a user |
| `POST` | `/auth/login` | — | Login and receive JWT |
| `GET` | `/products` | — | List products (`category`, `page`, `limit`) |
| `GET` | `/user/checkBalance` | Bearer | Get current balance |
| `PATCH` | `/user/deposit` | Bearer | Top up balance |
| `POST` | `/order/checkout` | Bearer (user) | Create an order |
| `PATCH` | `/order/orderPayment/:id` | Bearer (user) | Pay for an order |
| `PATCH` | `/order/updateOrder/:id/status` | Bearer (admin) | Update order status |

Send the JWT as:

```http
Authorization: Bearer <token>
```

### Example: register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@example.com\",\"password\":\"secret123\"}"
```

### Example: checkout

```bash
curl -X POST http://localhost:3000/order/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d "{\"items\":[{\"productId\":1,\"quantity\":2}]}"
```

### Order statuses

`Created` → `In_Progress` → `Paid` / `Cancelled` / `Executed`

Admins may set status to `In_Progress`, `Cancelled`, or `Executed`. Users pay for their own orders via `/order/orderPayment/:id`.

## Project structure

```
├── app.js                 # Express app & routers
├── server.js              # Entry point
├── sequelize.js           # DB connection
├── docker-compose.yml     # Local Postgres
└── src/
    ├── config/            # Env & constants
    ├── controllers/
    ├── middlewares/       # Auth, roles, validation
    ├── models/
    ├── repositories/
    ├── routes/
    ├── services/
    ├── vaildators/
    ├── docs/              # Swagger setup
    └── tests/
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the API server |
| `npm test` | Run Jest tests (`NODE_ENV=test`, in-band) |

## License

MIT © Kyrylo Shvetsov
