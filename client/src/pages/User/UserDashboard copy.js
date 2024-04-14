import { Heading } from "rsuite";

import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

export default function UserDashboard() {
  return (
    <Layout title={"User-Dashboard"} className="relative">
      <div className="absolute top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[9rem]">
          USER DASHBOARD
        </Heading>
        <div className="mt-[-.8rem]">
          <UserMenu />
        </div>
      </div>
    </Layout>
  );
}
