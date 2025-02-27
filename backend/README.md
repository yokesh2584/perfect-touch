# The Perfect Touch - Backend Documentation

The Perfect Touch is a modern e-commerce platform designed for beauty enthusiasts, built using the MERN stack (MongoDB, Express.js, React, Node.js). This README provides an overview of the backend structure, setup instructions, and key features.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Directory Structure](#directory-structure)
- [Key Features](#key-features)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/the-perfect-touch.git
   cd the-perfect-touch/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>
```

## Directory Structure

```
backend
├── .env
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── userController.js
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Review.js
├── routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── userRoutes.js
├── utils
│   └── cloudinary.js
├── package.json
├── server.js
└── README.md
```

## Key Features

- **User Authentication & Profiles**: Secure login/signup with personalized user dashboards.
- **Product Management**: CRUD operations for beauty product listings, categories, and inventory.
- **Shopping Cart & Checkout**: Interactive cart functionality with real-time updates and order summaries.
- **Admin Dashboard**: Comprehensive control panel for managing products, orders, and customer activities.
- **Reviews & Ratings**: Customers can review beauty products and share their experiences.
- **Search & Filtering**: Advanced product search with category-based filtering for easy navigation.
- **Responsive & Scalable Design**: Optimized UI for desktops, tablets, and mobile devices.

## API Endpoints

- **Authentication**
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.

- **Products**
  - `GET /api/products`: Retrieve all products.
  - `POST /api/products`: Create a new product (Admin only).
  - `PUT /api/products/:id`: Update a product (Admin only).
  - `DELETE /api/products/:id`: Delete a product (Admin only).

- **Orders**
  - `POST /api/orders`: Create a new order.
  - `GET /api/orders/:id`: Retrieve order details.

## Running the Application

To start the backend server, run the following command:

```
npm start
```

The server will run on the specified port (default: 5000). You can access the API at `http://localhost:3`000`.

## Conclusion

The Perfect Touch aims to revolutionize the online beauty shopping experience with robust security, real-time updates, and a user-friendly interface. For any issues or contributions, please refer to the main repository or contact the project maintainers.