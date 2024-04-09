import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"admin"}>
      <div className="flex bg-background relative flex-row items-center justify-center">
        <div className="absolute top-[10rem] left-[10rem]  ">
          <AdminMenu />
        </div>

        <div className="bg-secondary p-3 h-[10rem] w-[10rem] flex items-center absolute top-[10rem] right-[90rem] rounded-3xl ">
          <div className=" flex flex-col gap-3 ">
            <h1 className="font-bold ">{auth?.user?.name}</h1>
            <h1 className="font-bold ">{auth?.user?.email}</h1>
            <h1 className="font-bold ">{auth?.user?.phone}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
