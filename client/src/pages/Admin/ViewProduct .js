import React, { useEffect, useState } from "react";
import { FlexboxGrid, Heading } from "rsuite";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="absolute top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[10rem]">
          VIEW PRODUCT
        </Heading>
        <div className="relative">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item>
              <AdminMenu />
            </FlexboxGrid.Item>
            <div className="absolute top-[-5rem]  left-[30rem]">
              <h1>PRODUCTS</h1>
            </div>
            <div className="relative top-[-3rem] left-[27rem]">
              <ProductGrid products={products}></ProductGrid>
            </div>
          </FlexboxGrid>
        </div>
      </div>
    </Layout>
  );
};

export default ViewProduct;

function ProductGrid({ products }) {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products?.map((product) => (
            <div>
              <Link
                to={`/admindashboard/update-pro/${product.slug}`}
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
                      {/* <p className="mt-1 text-sm text-gray-500">
                        <StarIcon className="w-6 h-6 inline"></StarIcon>
                        <span className=" align-bottom">{product.rating}</span>
                      </p> */}
                      {/* {product.deleted &&  (
                        <p className="mt-1 text-sm font-bold text-rose-600">
                          <span className=" align-bottom">Deleted</span>
                        </p>
                      )} */}
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
        </div>
      </div>
    </div>
  );
}
