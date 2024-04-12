
import { Heading } from "rsuite";


import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

export default function AdminDashboard() {
  return (
    <Layout className="relative">
      <div className="absolute top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[9rem]">
          ADMIN DASHBOARD
        </Heading>
        <div className="mt-[-.8rem]">
          <AdminMenu />
        </div>
      </div>
    </Layout>
  );
}
