/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { Link, useNavigate } from "react-router-dom";
import { Button, Text } from "rsuite";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [password, setPassword] = useState("");
  const [name, setName] = useState(() => auth?.user?.name || "");
  const [phone, setPhone] = useState(() => auth?.user?.phone || "");
  const [address, setAddress] = useState(() => auth?.user?.address || "");
  const [answer, setAnswer] = useState(() => auth?.user?.answer || "");
  const [state, setState] = useState(() => auth?.user?.state || "");
  const [pinCode, setPinCode] = useState(() => auth?.user?.pinCode || "");
  const [email, setEmail] = useState(() => auth?.user?.email || "");

  const navigate = useNavigate();

  //get user data
  useEffect(() => {
    setName(auth?.user?.name || "");
    setPhone(auth?.user?.phone || "");
    setAddress(auth?.user?.address || "");
    setAnswer(auth?.user?.answer || "");
    setState(auth?.user?.state || "");
    setPinCode(auth?.user?.pinCode || "");
    setEmail(auth?.user?.email || "");
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        password,
        phone,
        address,
        answer,
        state,
        pinCode,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <Toaster />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text">
                  Your Account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form noValidate className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <div className="mt-2">
                      <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        type="text"
                        autoFocus
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      {/* {errors.email && (
                  <p className="text-red-900">{errors.email.message}</p>
                )} */}
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        id="name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Name"
                        type="text"
                        autoFocus
                        disabled
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      {/* {errors.email && (
                  <p className="text-red-900">{errors.email.message}</p>
                )} */}
                    </div>
                  </div>

                  <div>
                    <div className="mt-2">
                      <input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        required
                        type="text"
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      {/* {errors.email && (
                  <p className="text-red-900">{errors.email.message}</p>
                )} */}
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        id="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="What is Your Favorite Food"
                        required
                        type="text"
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter Your Address"
                        required
                        type="text"
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter Your state"
                        required
                        type="text"
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        id="pinCode"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        placeholder="Enter Your PinCode"
                        required
                        type="text"
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <Button
                      color="blue"
                      appearance="primary"
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Update Your Account
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
