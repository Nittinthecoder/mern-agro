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
    <Layout className="relative">
      <div className="absolute top-[8rem] lg:top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[9rem]">
          VIEW PRODUCT
        </Heading>
        <div className="relative">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item className="mt-[-1.4rem] lg:mt-[-.8rem] absolute left-[-1rem]">
              <AdminMenu />
            </FlexboxGrid.Item>
            <div className="absolute lg:top-[-5rem] lg:left-[30rem] top-[19rem]">
              <Heading>PRODUCTS</Heading>
            </div>
            <div className="relative lg:top-[-3rem] lg:left-[27rem] left-[3rem] top-[21rem] mb-[1rem]">
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
    <div className="lg:w-[50rem] w-[10rem] mb-[2rem] ">
      <div className=" px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 lg:grid lg:gap-y-10  lg:grid-cols-3 xl:gap-x-8">
          {products?.map((product) => (
            <div>
              <Link
                to={`/admindashboard/update-pro/${product.slug}`}
                key={product._id}
              >
                <div className=" border-solid border-2 p-2 bg-secondary border-primary rounded-md lg:w-[20rem] lg:h-[19rem] w-[19rem] h-[27rem] ">
                  <div className="lg:min-h-60 overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40">
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
        </div>
      </div>
    </div>
  );
}
