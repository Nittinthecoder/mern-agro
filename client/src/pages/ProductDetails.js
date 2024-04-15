/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import { Slider } from "rsuite";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";

import { Modal, ButtonToolbar, Button, Loader } from "rsuite";

import { Text } from "rsuite";
import Bargain from "./Bargain";
import { Toaster, toast } from "sonner";

const ProductDetails = () => {
  const params = useParams();
  // const navigate = useNavigate();
  const [product, setProduct] = useState({});

  const [cart, setCart] = useCart();

  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {}
  };

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <Toaster />
      <div className="flex flex-row justify-around md:px-2 ">
        <div className="">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="h-[20rem] w-[25rem] absolute left-[1rem] rounded-lg object-cover object-center lg:w-[40rem] lg:h-[30rem] lg:absolute lg:left-[10rem] lg:top-[10rem]"
            // className=""
          />
        </div>
        <div className="relative left-[-2rem] md:left-[-12rem] top-[20rem] lg:top-3 lg:left-[13rem] 2xl:left-[2rem] lg:border-l  p-4">
          <div className="ml-[3rem]">
            <Text as="b" size="2rem" color="green">
              {product.name}
            </Text>
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                <Text as="b" size="xxl">
                  Stock : {product.quantity}
                </Text>
              </h1>
              <div className="flex flex-col lg:py-4 ">
                <div className="py-2 mb-[2rem] max-w-[30rem] ">
                  <Text size="xxl">{product.description}</Text>
                </div>
                <div className="py-2 max-w-[30rem] ">
                  <p>{product.detail}</p>
                </div>
                <div className="py-2 max-w-[30rem] ">
                  <Text as="b" size="2rem">
                    Rs {product.price}
                  </Text>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Quantity
                    </h3>
                  </div>

                  

                  <Slider progress defaultValue={0} onChange={(value) => {}} />
                </div>
                <div className="my-7">
                  <ButtonToolbar>
                    <Button appearance="primary" onClick={handleOpen}>
                      Want to Bargain
                    </Button>
                  </ButtonToolbar>
                </div>
                <div className="py-2 max-w-[30rem] relative top-[-1rem] ">
                  <Button
                    onClick={() => {
                      setCart([...cart, product]);

                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Product Added to Cart");
                    }}
                    size="lg"
                    appearance="primary"
                    color="green"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                onEntered={handleEntered}
                onExited={() => {
                  setRows(0);
                }}
              >
                <Modal.Body>
                  {rows ? (
                    <div className="relative">
                      <div className=" flex flex-col gap-4 items-center">
                        <Text>TALK TO THE SELLER</Text>
                        <Bargain />
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <Loader size="md" />
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose} appearance="primary">
                    Ok
                  </Button>
                  <Button onClick={handleClose} appearance="subtle">
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
