import React, { useState } from "react";
import { Button, Text } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Toaster ,toast } from "sonner";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Forgot = () => {
  const [auth] = useAuth();
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // form function for forgot password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
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
      <Layout title={"Reset Password"}>
      <Toaster />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://i.pinimg.com/originals/30/34/5a/30345a99c8bc23f42d6b9848227b1f0d.jpg"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset your Acc Password
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
                  
                  <div className="text-sm"></div>
                </div>
                <div className="mt-3">
                  <input
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type in the answer which was asked during registeration"
                    type="text"
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-3">
                  <input
                    id="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
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
                  RESET PASSWORD
                </Button>
              </div>
            </form>

            {!auth?.user && <p className="mt-10 ml-[5rem] text-center flex flex-row text-sm text-text">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-semibold ml-[1rem] mt-[.1rem]  leading-6 text-secondary hover:text-lime-500"
              >
                <Text color="green">SIGN IN</Text>
              </Link>
            </p>}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Forgot;
