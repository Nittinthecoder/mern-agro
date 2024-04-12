import React from "react";
import Layout from "../../components/Layout/Layout";
import { Heading } from "rsuite";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminSet = () => {
  return (
    <div>
      <Layout className="relative">
        <div className="absolute top-[10rem]">
          <Heading className="relative top-[-3rem] text-xl left-[9rem]">
            ADMIN SETTINGS
          </Heading>
          {/* <div className="mt-[-.8rem]">
            <AdminMenu />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default AdminSet;
