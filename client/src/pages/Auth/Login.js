/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, ButtonGroup, ButtonToolbar, Text } from "rsuite";
// import { input } from "rsuite";

import axios from "axios";

import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Toaster, toast } from "sonner";
// import { toast } from "sonner";
// import { toast } from "react-toastify";
// import toast from "react-hot-toast";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form fun for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
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
      <Layout title={"Sign-in"}>
        <Toaster />
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
                </div>
              </div>

              <div>
                <div className="flex mt-[-1rem] items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>
                  <div className="text-sm">
                    <ButtonGroup size="xs">
                      <Button
                        color="green"
                        appearance="ghost"
                        className="font-semibold text-secondary hover:text-black"
                      >
                        <Link to="/forgot">Forgot password</Link>
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <Button
                  color="blue"
                  appearance="primary"
                  type="submit"
                  className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Sign in
                </Button>
              </div>
            </form>

            <p className="mt-10 ml-[3.5rem] text-center flex flex-row text-sm text-text">
              Not a member?{" "}
              <Link
                to="/register"
                className="font-semibold ml-3  leading-6 text-secondary hover:text-lime-500"
              >
                <Text color="green">Create your Account</Text>
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
