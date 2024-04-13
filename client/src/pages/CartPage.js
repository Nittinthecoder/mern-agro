/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "rsuite";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((amount, item) => item.price + amount, 0);

  const totalItems = cart.reduce((total, item) => total + item.stock, 0);

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
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
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-background">
        <div>
          <div className="mx-auto  bg-background max-w-7xl px-4 sm:px-6 lg:px-8">
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your cart is Empty"}
            <div className="border-t border-primary mt-5 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-primary">
                  {cart.map((item) => (
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
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description.substring(0, 51)}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          {/* <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              // onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div> */}

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

            <div className="border-t border-primary px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs {totalAmount} </p>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Button
                  appearance="primary"
                  className="rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:text-text"
                >
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-text animate-bounce hover:text-primary"
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
    </Layout>
  );
};

export default CartPage;
