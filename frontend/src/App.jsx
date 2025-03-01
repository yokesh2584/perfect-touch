import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./components/Product/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./components/Cart/Checkout";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProfilePage from './pages/ProfilePage';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Dashboard from "./components/Admin/Dashboard";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return token && user && user.role === role ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
