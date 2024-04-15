/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import moment from "moment";
import { FlexboxGrid, Heading } from "rsuite";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const chooseColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-200 text-purple-600";
      case "Dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "Delivered":
        return "bg-green-200 text-green-600";
      case "Cancelled":
        return "bg-red-200 text-red-600";
      case "Processing":
        return "bg-blue-200 text-blue-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <Layout title={"Your Orders"}>
      {/* <Toaster /> */}
      <div className="absolute top-[8rem] lg:top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl lg:left-[8rem] left-[9.5rem]">
          YOUR ORDERS
        </Heading>
        <div className="relative">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item className="mt-[-1.4rem] lg:mt-[-.8rem] absolute lg:left-[-2rem] left-[1rem]">
              <UserMenu />
            </FlexboxGrid.Item>
            <div className="absolute lg:top-[-3rem] lg:left-[30rem] top-[4rem]">
              <FlexboxGrid.Item>
                <div className="absolute lg:top-[-5rem] lg:left-[25rem] 2xl:left-[28rem] ">
                  <Heading>Orders</Heading>
                </div>
                <div className="w-[60rem] transform lg:rotate-0 rotate-[90deg] relative lg:top-0 top-[32rem] lg:left-[-5rem] 2xl:left-[1rem] left-[9rem] mb-3   ">
                  <div className="overflow-x-auto">
                    <div className="  flex items-center justify-center  font-sans overflow-hidden">
                      <div className="w-full ">
                        <div className=" shadow-md rounded my-6">
                          <table className=" w-[60rem] table-auto">
                            <thead>
                              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Items</th>
                                <th className="py-3 px-6 text-left">Buyer</th>
                                <th className="py-3 px-6 text-center">Date</th>
                                <th className="py-3 px-6 text-center">
                                  PAYMENT
                                </th>
                                <th className="py-3 px-6 text-center">
                                  Status
                                </th>
                                <th className="py-3 px-6 text-center">
                                  Quantity
                                </th>
                                <th className="py-3 px-6 text-center">
                                  TOTAL AMOUNT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                              {orders.map((o, i) => {
                                return (
                                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                      <div className="flex items-center">
                                        <span className="font-medium">
                                          {i + 1}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                      <div className="flex items-center">
                                        {o?.products?.map((p, i) => {
                                          return (
                                            <div>
                                              <div className="mr-1">
                                                {/* <img
                                                  className="h-10 w-10 rounded-full"
                                                  src={`/api/v1/product/product-photo/${p._id}`}
                                                  alt={p.name}
                                                /> */}
                                                <h6>{o?.products[0]?.name}</h6>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                      <div className="flex items-center">
                                        <span>{o?.buyer?.name}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                      <div className="flex items-center justify-center">
                                        <span>
                                          {moment(o?.createAt).fromNow()}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                      <div className="flex items-center justify-center">
                                        <span>
                                          {o?.payment?.success
                                            ? "Success"
                                            : "Failed"}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                      <span
                                        className={`${chooseColor(
                                          o.status
                                        )} py-1 px-3 rounded-full text-xs`}
                                      >
                                        {o.status}
                                      </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                      <div className="flex item-center justify-center">
                                        <span>{o?.products?.length}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                      <div className="flex item-center justify-center">
                                        <span>
                                          Rs {o?.payment?.transaction?.amount}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FlexboxGrid.Item>
            </div>
          </FlexboxGrid>
          <div>
            <FlexboxGrid
              className="relative"
              justify="space-around"
            ></FlexboxGrid>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
