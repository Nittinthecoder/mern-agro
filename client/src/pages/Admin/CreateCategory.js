import React, { useEffect, useState } from "react";
import { Form, ButtonToolbar, Button, Heading, FlexboxGrid } from "rsuite";

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout className="relative">
      <div className="absolute top-[10rem]">
        <Heading className="relative top-[-3rem] text-xl left-[9rem]">
          CREATE CATEGORY
        </Heading>
        <div className="relative">
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item>
              <AdminMenu />
            </FlexboxGrid.Item>
            <div className="absolute top-[-3rem] left-[30rem]">
              <FlexboxGrid.Item>
                <div>
                  <div>
                    <CategoryForm
                      handleSubmit={handleSubmit}
                      value={name}
                      setValue={setName}
                    />
                  </div>
                </div>
              </FlexboxGrid.Item>
            </div>
          </FlexboxGrid>
          <div>
            <FlexboxGrid className="relative" justify="space-around">
              <div className="absolute top-[9rem] left-[30rem]">
                <div className="flex flex-row gap-[12rem] mb-5">
                  <div className="sm:ml-[4rem] lg:ml-[4rem]">NAME</div>
                  <div className="sm:ml-[-3.6rem]">ACTIONS</div>
                </div>
                <div className="flex flex-col">
                  {categories?.map((c) => (
                    <>
                      <table className="w-full mb-3">
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td className="relative left-[5rem]">
                            <Button
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                              className="ml-5"
                              appearance="primary"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                              className="ml-5"
                              appearance="ghost"
                              color="red"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </table>
                    </>
                  ))}
                </div>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </FlexboxGrid>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
