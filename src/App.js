import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Circle } from "lucide-react";
import SocialShopping from "./pages/SocialShopping";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:mainCategory" element={<Category />} />
          <Route
            path="/category/:mainCategory/:subCategory"
            element={<Products />}
          />
          <Route
            path="/product/:mainCategory/:subCategory/:index"
            element={<ProductDetails />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/circle" element={<Circle />} />
          <Route path="/social-shopping" element={<SocialShopping />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
