import React from "react";
import { Link } from "react-router-dom";
import { List } from "rsuite";

const AdminMenu = () => {
  return (
    <>
      <div className="relative w-[12rem] ">
        <Link to="/admindashboard" className="mb-3 absolute top-[-4rem] left-3 text-2xl font-bold items-center text-center uppercase">
          Admin Panel
        </Link>
      </div>
      <List className="flex flex-col p-3">
        <Link to="/admindashboard/create-category" className="mb-3">
          Create Category
        </Link>
        <Link to="/admindashboard/create-product" className="mb-3">
          Create Product
        </Link>
        <Link to="/admindashboard/product" className="mb-3">
          View Product
        </Link>
        <Link to="/admindashboard/user" className="">
          {" "}
          Users{" "}
        </Link>
      </List>
    </>
  );
};

export default AdminMenu;
