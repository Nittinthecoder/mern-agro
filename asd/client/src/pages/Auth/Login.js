import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { toast } from "sonner";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

export function Login() {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //function for login with api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title={'Sign-in'}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://i.pinimg.com/originals/30/34/5a/30345a99c8bc23f42d6b9848227b1f0d.jpg"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="mt-2">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    type="email"
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                  {/* {errors.email && (
                  <p className="text-red-900">{errors.email.message}</p>
                )} */}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>
                  <div className="text-sm">
                    <Link
                      to="/forgot"
                      className="font-semibold text-secondary hover:text-accent"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                  {/* {errors.password && (
                  <p className="text-red-900">{errors.password.message}</p>
                )} */}
                </div>
                {/* {error && <p className="text-red-900">{error.message}</p>} */}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Sign in
                </button>
              </div>
              {/* <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  <Link to="/">Continue Shopping</Link>
                </button>
              </div> */}
            </form>

            <p className="mt-10 text-center text-sm text-text">
              Not a member?{" "}
              <Link
                to="/register-acc"
                href="#"
                className="font-semibold leading-6 text-secondary hover:text-accent"
              >
                Create your account now
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
