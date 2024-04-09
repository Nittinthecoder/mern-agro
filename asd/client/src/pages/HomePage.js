import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
// import { useAuth } from "../context/auth";
import { Container, Content } from "rsuite";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductList } from "./ProductList";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);

  // get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get products
  const getAllProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product`);
      // setLoading(false);
      setProducts(data.products);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      // setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // useEffect(() => {
  //   if (!checked.length || !radio.length) getAllProducts();
  // }, [checked.length, radio.length]);

  // useEffect(() => {
  //   if (checked.length || radio.length) filterProduct();
  // }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="bg-background">
        <ProductList />
      </div>
    </Layout>
  );
};

export default HomePage;
