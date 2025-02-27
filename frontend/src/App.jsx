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
import AdminLogin from "./components/Auth/AdminLogin";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ManageProducts from "./components/Admin/ManageProducts";

const PrivateRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? children : <Navigate to="/admin/login" />;
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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/manage-products"
          element={
            <PrivateRoute>
              <ManageProducts />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
