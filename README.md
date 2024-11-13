# E-Commerce Backend Project

This is the backend of an e-commerce application built using Node.js, Express, and MongoDB. The project includes features like user authentication, product and category management, and a shopping cart. JWT authentication is used for secure access to APIs.

## Features

- **User Authentication**
  - User Sign Up and Sign In functionality
  - Admin role with special permissions
  - Password hashing and JWT token generation
- **Category Management**
  - Create, read, update, and delete product categories
- **Product Management**
  - CRUD operations for managing products
  - Link products to categories
- **Shopping Cart**
  - Create and update shopping carts
  - Add/remove products to/from the cart
  - Calculate the total cost of products in the cart
- **JWT Authentication**
  - Secure API endpoints using JWT tokens for authorized access

## Installation

### Prerequisites

- Node.js (v14.x or above)
- MongoDB (locally installed or use a MongoDB Atlas cluster)
  
### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/ecom-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ecom-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file at the root of the project to configure environment variables:
    ```bash
    DB_URL=mongodb://localhost/ecom_db
    PORT=8888
    SECRET_KEY=your_secret_key_here
    ```
5. Start the server:
    ```bash
    npm start
    ```
6. The backend server will start on `http://localhost:8888`.

## API Endpoints

### Authentication

- **POST /ecomm/api/v1/auth/signup**
  - Request body:
    ```json
    {
      "name": "User Name",
      "userId": "user_id",
      "email": "user@example.com",
      "password": "user_password"
    }
    ```
  - Response: User is created and returned.
  
- **POST /ecomm/api/v1/auth/signin**
  - Request body:
    ```json
    {
      "userId": "user_id",
      "password": "user_password"
    }
    ```
  - Response: JWT token and user details are returned.

### Category Management

- **POST /ecomm/api/v1/auth/categories**
  - Request body:
    ```json
    {
      "name": "category_name",
      "description": "category_description"
    }
    ```
  - Response: Created category details.

- **GET /ecomm/api/v1/auth/categories**
  - Response: List of all categories.

- **GET /ecomm/api/v1/auth/categories/:category_name**
  - Response: Category details by name.

- **PUT /ecomm/api/v1/auth/categories/:category_name**
  - Request body:
    ```json
    {
      "name": "new_category_name",
      "description": "new_category_description"
    }
    ```
  - Response: Updated category details.

### Product Management

- **POST /ecomm/api/v1/auth/products**
  - Request body:
    ```json
    {
      "name": "product_name",
      "description": "product_description",
      "category": "category_name",
      "cost": "product_cost"
    }
    ```
  - Response: Created product details.

- **GET /ecomm/api/v1/auth/products**
  - Query parameter: `category` (optional)
  - Response: List of products filtered by category.

### Cart Management

- **POST /ecomm/api/v1/carts**
  - Request: Create a new cart.
  - Response: Cart details with an empty products list.

- **PUT /ecomm/api/v1/carts/:id**
  - Request body:
    ```json
    {
      "products": ["product_name1", "product_name2"]
    }
    ```
  - Response: Updated cart details with total cost.

## Environment Variables

- `DB_URL`: MongoDB connection URL (local or Atlas)
- `PORT`: Port number for the server to run on (default is 8888)
- `SECRET_KEY`: Secret key for JWT generation

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB ODM for Node.js
- `bcryptjs`: Library for hashing passwords
- `jsonwebtoken`: Library for generating JWT tokens
- `body-parser`: Middleware for parsing request bodies
