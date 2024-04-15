/* eslint-disable jsx-a11y/no-redundant-roles */
import { Heading, List } from "rsuite";

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

export default function AdminDashboard() {
  const [auth, setAuth] = useAuth();


  return (
    <Layout className="relative">
      <div className="absolute top-[8rem] lg:top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[8rem]">
          ADMIN DASHBOARD
        </Heading>
        <div className="mt-[-1.4rem] lg:mt-[-.8rem] absolute left-[-1rem]">
          <AdminMenu />
        </div>
        <div className="absolute lg:left-[30rem] left-[1rem] top-[21rem] border solid border-lime-500 rounded-md px-3  lg:top-1">
          <List>
            <List.Item>{auth?.user?.name}</List.Item>
            <List.Item>{auth?.user?.email}</List.Item>
            <List.Item>{auth?.user?.phone}</List.Item>
            <ul role="list" className="lg:w-[40rem] w-[23rem] ">
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
}
