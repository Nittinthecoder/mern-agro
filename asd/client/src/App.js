import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PrivateRoute from "../src/components/Routes/PrivateRoute";
import AdminRoute from "../src/components/Routes/AdminRoute";
import Dashboard from "./pages/user/Dashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import User from "./pages/Admin/User";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userdashboard" element={<PrivateRoute />}>
          <Route path="/userdashboard" element={<Dashboard />} />
          <Route path="/userdashboard/orders" element={<Orders />} />
          <Route path="/userdashboard/profile" element={<Profile />} />
        </Route>
        <Route path="/admindashboard" element={<AdminRoute />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route
            path="/admindashboard/create-category"
            element={<CreateCategory />}
          />
          <Route
            path="/admindashboard/create-product"
            element={<CreateProduct />}
          />
          <Route path="/admindashboard/product" element={<Products />} />
          <Route
            path="/admindashboard/product/:slug"
            element={<UpdateProduct />}
          />
          <Route
            path="/admindashboard/product/product-photo/:slug"
            element={<ProductDetails />}
          />
          <Route path="/admindashboard/users" element={<User />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
