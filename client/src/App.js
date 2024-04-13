import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/404";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import UserDashboard from "./pages/User/UserDashboard copy";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import Forgot from "./pages/Auth/Forgot";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import ViewProduct from "./pages/Admin/ViewProduct ";
import AdminSet from "./pages/Admin/AdminSet";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

import Chat from "./Chat";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pro-details/:slug" element={<ProductDetails />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat-auth" element={<Chat />} />
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* user routes */}
        <Route path="/userdashboard" element={<PrivateRoute />}>
          <Route path="" element={<UserDashboard />} />
          <Route path="/userdashboard/profile" element={<Profile />} />
          <Route path="/userdashboard/orders" element={<Orders />} />
        </Route>

        {/* admin routes */}
        <Route path="/admindashboard" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route
            path="/admindashboard/create-cate"
            element={<CreateCategory />}
          />
          <Route
            path="/admindashboard/create-pro"
            element={<CreateProduct />}
          />
          <Route path="/admindashboard/view-pro" element={<ViewProduct />} />
          <Route
            path="/admindashboard/update-pro/:slug"
            element={<UpdateProduct />}
          />
          <Route path="/admindashboard/admin-set" element={<AdminSet />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
