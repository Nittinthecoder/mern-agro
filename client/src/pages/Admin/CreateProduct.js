import React, { useEffect, useState } from "react";

import { Form, ButtonToolbar, Button, Heading, FlexboxGrid } from "rsuite";

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/admindashboard/view-pro");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Layout className="relative ">
      <div className="absolute top-[8rem] lg:top-[10rem]  lg:h-auto ">
        <Heading className="relative top-[-3rem] text-xl left-[8rem]">
          CREATE PRODUCT
        </Heading>
        <div className="relative">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item className="mt-[-1.4rem] lg:mt-[-.8rem] absolute left-[-1rem]">
              <AdminMenu />
            </FlexboxGrid.Item>
            <div className="absolute lg:left-[30rem] left-[2rem] top-[21rem] lg:top-1">
              <Form>
                <Form.Group>
                  <Form.ControlLabel>Select Category</Form.ControlLabel>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    className=" mb-3 w-[22rem] lg:w-[20rem] rounded-xl "
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Group>
                <Form.Group>
                  <label className="btn bg-lime-300 hover:bg-black hover:text-white p-2 rounded-xl">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </Form.Group>
                <Form.Group>
                  {photo && (
                    <div className="text-center mt-2">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive w-[30rem] lg:w-[20rem]"
                      />
                    </div>
                  )}
                </Form.Group>
                <Form.Group>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" Type Product Name Here"
                    className="p-2 mt-3 w-[22rem] rounded-md lg:w-[14rem] border solid border-lime-400 "
                  />
                </Form.Group>
                <Form.Group>
                  <TextArea
                    rows={6}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" Type Product Description Here"
                    className="p-2 mt-3 sm:w-[10rem] lg:w-[19rem] rounded-md  border solid border-lime-400"
                  />
                </Form.Group>
                <Form.Group>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="p-2 mt-3 sm:w-[10rem] lg:w-[7rem] rounded-md border solid border-lime-400"
                  />
                </Form.Group>
                <Form.Group>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    className="p-2 mt-3 sm:w-[10rem] lg:w-[7rem] rounded-md border solid border-lime-400"
                  />
                </Form.Group>
                {/* <Form.Group>
                  <Select
                    placeholder="Select Shipping "
                    size="large"
                    className="p-2 mt-3  rounded-md border solid border-lime-400"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </Form.Group> */}
                <Form.Group className="mb-6">
                  <ButtonToolbar>
                    <Button onClick={handleCreate} appearance="primary">
                      Submit
                    </Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </div>
          </FlexboxGrid>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
