/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { Link, useNavigate } from "react-router-dom";
import { Button, Heading, Text } from "rsuite";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useAuth } from "../../context/auth";
import { List } from "rsuite";

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
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <Toaster />
      <div className="absolute top-[8rem] lg:top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl lg:left-[8rem] left-[9.5rem]">
          YOUR PROFILE
        </Heading>
        <div className="mt-[-1.4rem] lg:mt-[-.8rem] absolute lg:left-[-2rem] left-[1.4rem]">
          <UserMenu />
        </div>
        <div className="absolute lg:left-[30rem] left-[1.5rem] top-[10rem] border solid border-lime-500 rounded-md px-3  lg:top-1">
          <List>
            <List.Item>{auth?.user?.name}</List.Item>
            <List.Item>{auth?.user?.email}</List.Item>
            <List.Item>{auth?.user?.phone}</List.Item>
            <ul  className="lg:w-[40rem] w-[23rem] ">
              {auth?.user && (
                <div>
                  <li
                    // key={address.email}
                    className="flex justify-between mt-3 gap-x-6 px-5 py-5 "
                  >
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {auth?.user?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {auth?.user?.address}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {auth?.user?.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className=" sm:flex sm:flex-col sm:items-end ">
                      <p className="text-sm leading-6 text-gray-900">
                        {auth?.user?.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {auth?.user?.state}
                      </p>
                    </div>
                  </li>
                </div>
              )}
            </ul>
          </List>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
