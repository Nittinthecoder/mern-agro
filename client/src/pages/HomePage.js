/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";


import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Checkbox, Radio } from "antd";

import { Prices } from "../components/Prices.js";
import { Button } from "rsuite";
import {  XMarkIcon } from "@heroicons/react/24/outline";




const HomePage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {}
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
      toast.success("Loaded More Products");
    } catch (error) {
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
      toast.success("Product Showing Based on selected Category");
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
      toast.success("Product Showing Based on selected Price Range");
    } catch (error) {}
  };

  return (
    <Layout>
      <div className=" mt-[-4rem] ">
        <Toaster />
        <div className="bg-white">
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden bg-white"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      {/* {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))} */}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                ALL PRODUCTS
              </h1>

              <div className="flex items-center"></div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h4 className="text-center my-3">Filter By Category</h4>
                  <div className="flex flex-col ">
                    {categories?.map((c) => (
                      <Checkbox
                        key={c._id}
                        className="mb-2"
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                  <h4 className="text-center my-3">Filter By Price</h4>
                  <div className="flex flex-col">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices?.map((p) => (
                        <div key={p._id}>
                          <Radio className="mb-2" value={p.array}>
                            {p.name}
                          </Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                  <div className="d-flex flex-column">
                    <Button
                      appearance="primary"
                      color="red"
                      className="mt-3"
                      onClick={() => window.location.reload()}
                    >
                      RESET FILTERS
                    </Button>
                  </div>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <ProductGrid
                    setPage={setPage}
                    page={page}
                    total={total}
                    loading={loading}
                    products={products}
                  />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

function ProductGrid({ products, setPage, page, total, loading }) {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products?.map((product) => (
            <div>
              <Link
                // to={`/admindashboard/update-pro/${product.slug}`}
                to={`/pro-details/${product.slug}`}
                key={product._id}
              >
                <div className="group relative border-solid border-2 p-2 bg-secondary border-primary rounded-md">
                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-40">
                    <img
                      src={`/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <div>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </div>
                      </h3>
                    </div>
                    <div>
                      <p className="text-sm block font-bold text-text">
                        Rs {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <Button
                  appearance="primary"
                  // className="btn btn-warning"
                  onClick={(e) => {
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load more"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
