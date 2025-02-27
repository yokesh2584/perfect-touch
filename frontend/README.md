# The Perfect Touch

The Perfect Touch is a modern, fully responsive e-commerce platform designed to offer a seamless online shopping experience for beauty enthusiasts. This application allows customers to explore a curated selection of beauty products, add items to their cart, make secure payments, track orders, and manage their profiles effortlessly.

## Project Structure

The project is structured into two main parts: the backend and the frontend.

### Backend

The backend is built using Node.js and Express.js, with MongoDB as the database. It handles user authentication, product management, order processing, and more.

- **Controllers**: Contains the logic for handling requests and responses.
- **Models**: Defines the data structure for users, products, orders, and reviews.
- **Routes**: Manages the API endpoints for the application.
- **Middleware**: Contains functions for authentication and error handling.
- **Utils**: Includes utility functions, such as image uploads to Cloudinary.

### Frontend

The frontend is developed using React and Vite, providing a dynamic and responsive user interface. It features:

- **Components**: Reusable UI elements for authentication, product display, cart management, and more.
- **Pages**: Different views for the application, including home, product details, cart, and user profile.
- **Services**: Handles API calls to the backend for data fetching and manipulation.
- **Context**: Manages global state for the application.

## Key Features

- **User Authentication & Profiles**: Secure login/signup with personalized user dashboards.
- **Product Management**: CRUD operations for beauty product listings, categories, and inventory.
- **Shopping Cart & Checkout**: Interactive cart functionality with real-time updates and order summaries.
- **Admin Dashboard**: Comprehensive control panel for managing products, orders, and customer activities.
- **Reviews & Ratings**: Customers can review beauty products and share their experiences.
- **Search & Filtering**: Advanced product search with category-based filtering for easy navigation.
- **Responsive & Scalable Design**: Optimized UI for desktops, tablets, and mobile devices.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up your environment variables in the `.env` file.

4. Start the backend server:
   ```
   npm start
   ```

5. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

6. Start the frontend development server:
   ```
   npm run dev
   ```

## Conclusion

With robust security, real-time updates, and a user-friendly interface, The Perfect Touch aims to revolutionize the online beauty shopping experience—making transactions more efficient, engaging, and enjoyable.