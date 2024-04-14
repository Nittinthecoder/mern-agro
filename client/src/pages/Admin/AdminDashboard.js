/* eslint-disable jsx-a11y/no-redundant-roles */
import { Heading, List } from "rsuite";

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

export default function AdminDashboard() {
  const [auth, setAuth] = useAuth();


  return (
    <Layout className="relative">
      <div className="absolute top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[9rem]">
          ADMIN DASHBOARD
        </Heading>
        <div className="mt-[-.8rem]">
          <AdminMenu />
        </div>
        <div className="absolute left-[30rem]">
          <List>
            <List.Item>{auth?.user?.name}</List.Item>
            <List.Item>{auth?.user?.email}</List.Item>
            <List.Item>{auth?.user?.phone}</List.Item>
            <ul role="list" className="w-[40rem]">
              {auth?.user && (
                <div>
                  <li
                    // key={address.email}
                    className="flex justify-between mt-3 gap-x-6 px-5 py-5 border-solid border-2 border-secondary"
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
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
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
