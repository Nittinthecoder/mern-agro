import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/404";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;