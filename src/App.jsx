import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HomeLogin from "./pages/HomeLogin";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Products from "./pages/Products";
import AdminProduct from "./pages/Admin/AdminProduct";
import AddProduct from "./pages/Admin/AddProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // tambahkan state isLoggedIn

  // fungsi untuk mengecek apakah user sudah login
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    AOS.init(
      {
        offset: 100,
        duration: 700,
        easing: "ease-in",
        delay: 100,
      },
      []
    );
    checkLoginStatus(); // panggil fungsi checkLoginStatus saat komponen dipasang
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
