# Storefront Backend Project

## Setup Instructions
1. Install dependencies: `yarn install`
2. Configure environment variables in `.env` file.
3. Database Setup:
   - Create user: `shopping_user` with password `password123`
   - Create databases: `shopping` and `shopping_test`
4. Run Migrations: `db-migrate up`
5. Start Server: `yarn watch`

## Ports
- Backend: localhost:3000
- Database: 5432

## API Endpoints
- POST /users (Create User - returns Token)
- GET /users (Index - Token required)
- GET /products (Index)
- POST /products (Create - Token required)
- GET /users/:id/current-order (Current Order - Token required)
