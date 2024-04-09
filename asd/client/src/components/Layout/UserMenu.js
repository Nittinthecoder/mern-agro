import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group flex flex-col">
          <h4>Dashboard</h4>
          <NavLink
            to="/userdashboard/profile"
            className="list-group-item mt-8 list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/userdashboard/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
