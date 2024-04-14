/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Toaster, toast } from "sonner";

import DropIn from "braintree-web-drop-in-react";

import { Button } from "rsuite";

function Checkout() {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((amount, item) => item.price + amount, 0);

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {}
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {}
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/userdashboard/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form className=" px-5 py-12 mt-12">
              <div className="space-y-12">
                <div className="border-b border-primary pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing addresses
                  </p>
                  <ul role="list">
                    {auth?.user ? (
                      <li
                        // key={address.email}
                        className="flex justify-between mt-3 gap-x-6 px-5 py-5 border-solid border-2 border-secondary"
                      >
                        <div className="flex gap-x-4">
                          <input
                            name="address"
                            type="radio"
                            className="h-4 w-4 border-separate text-text focus:ring-primary"
                          />
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
                    ) : (
                      <div className="mb-3">
                        {auth?.token ? (
                          <Button
                            appearance="primary"
                            color="green"
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/userdashboard/profile")}
                          >
                            Add Address
                          </Button>
                        ) : (
                          <Button
                            appearance="primary"
                            color="blue"
                            className="mt-5"
                            onClick={() =>
                              navigate("/login", {
                                state: "/checkout",
                              })
                            }
                          >
                            Please Login to checkout
                          </Button>
                        )}
                      </div>
                    )}
                  </ul>

                  <div className="mt-10 space-y-10">
                    {!clientToken || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12  max-w-7xl px-0 sm:px-0 lg:px-0">
              <div className="border-t border-text px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-white">
                    {cart?.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-primary">
                          <img
                            src={`/api/v1/product/product-photo/${item._id}`}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.name}</a>
                              </h3>
                              <p className="ml-4">Rs {item.price}</p>
                            </div>
                            {/* <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p> */}
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              {/* <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-5 text-gray-900"
                              >
                                Qty <span>{item.quantity}</span>
                              </label> */}
                            </div>

                            <div className="flex">
                              <Button
                                appearance="ghost"
                                color="red"
                                onClick={(e) => removeCartItem(e, item._id)}
                                type="button"
                                className="font-medium text-primary hover:scale-x-95"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-text px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>Rs {totalAmount}</p>
                </div>

                <div className="mt-6 flex items-center justify-center ">
                  <Button
                    className="btn btn-primary"
                    appearance="primary"
                    color="green"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </Button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-text">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-secondary hover:text-primary"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> </span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;
