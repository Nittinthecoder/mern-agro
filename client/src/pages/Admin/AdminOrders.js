/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Layout from "../../components/Layout/Layout";
import { FlexboxGrid, Heading } from "rsuite";
import moment from "moment";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Pending",
    "Dispatched",
    "Delivered",
    "Cancelled",
    "Processing",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {}
  };

  return (
    <Layout>
      {/* <Toaster /> */}
      <div className="absolute top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[9rem]">
          ADMIN ORDERS
        </Heading>
        <div className="relative">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item>
              <AdminMenu />
            </FlexboxGrid.Item>
            <div className="absolute top-[-3rem] left-[30rem]">
              <FlexboxGrid.Item>
                <h1>ALL ORDERS</h1>

                <div className="w-[60rem]">
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
                                      <span className="bg-purple-200 text-purple-600 py-3 px-3 rounded-full text-xs">
                                        <Select
                                          className="w-[9rem]"
                                          onChange={(value) =>
                                            handleChange(o._id, value)
                                          }
                                          defaultValue={o?.status}
                                        >
                                          {status.map((s, i) => (
                                            <Option key={i} value={s}>
                                              {s}
                                            </Option>
                                          ))}
                                        </Select>
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

export default AdminOrders;
