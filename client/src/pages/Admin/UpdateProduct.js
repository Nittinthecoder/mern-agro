import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, ButtonToolbar, FlexboxGrid, Form, Heading } from "rsuite";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/admindashboard/view-pro");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succesfully");
      navigate("/admindashboard/view-pro");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="absolute h-[1100px] top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[10rem]">
          VIEW PRODUCT
        </Heading>
        <div className="relative">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item>
              <AdminMenu />
            </FlexboxGrid.Item>
            <div className="relative top-[-5rem] left-[30rem]">
              <h1>UPDATE YOUR PRODUCT</h1>
            </div>
            <div className="absolute top-[-3rem] left-[30rem]">
              <Form>
                <Form.Group>
                  <Form.ControlLabel>Select Category</Form.ControlLabel>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                    value={category}
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
                  {photo ? (
                    <div className="text-center mt-2">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className=""
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
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
                    className="p-2 mt-3 sm:w-[10rem] rounded-md lg:w-[14rem] border solid border-lime-400 "
                  />
                </Form.Group>
                <Form.Group>
                  <TextArea
                    rows={6}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" Type Product Description Here"
                    className="p-2 mt-3 sm:w-[10rem] lg:w-[19rem] border solid border-lime-400"
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
                <Form.Group>
                  <Select
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button
                      onClick={handleUpdate}
                      appearance="primary"
                      color="green"
                    >
                      UPDATE PRODUCT
                    </Button>
                    <Button
                      onClick={handleDelete}
                      appearance="ghost"
                      color="red"
                    >
                      DELETE PRODUCT
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

export default UpdateProduct;
