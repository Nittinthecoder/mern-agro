/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import AdminMenu from "../../components/Layout/AdminMenu"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useAuth } from "../../context/auth";
import { Modal, Button, Loader, Placeholder } from "rsuite";

const ResetAns = () => {
  const [auth, setAuth] = useAuth();

  const [answer, setAnswer] = useState(() => auth?.user?.answer || "");

  const navigate = useNavigate();

  //get user data
  useEffect(() => {
    setAnswer(auth?.user?.answer || "");
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        answer,
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
    <Layout title={"Reset Answer"}>
      <Toaster />
      { auth?.user?.role === 0 && <div className="col-md-3">
        <UserMenu />
      </div>}
      { auth?.user?.role === 1 && <div className="col-md-3">
        <AdminMenu />
      </div>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text">
            Reset Your Answer
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
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
              <Button
                color="blue"
                appearance="primary"
                type="submit"
                className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetAns;
