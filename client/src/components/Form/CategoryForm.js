import React from "react";
import { Button, ButtonToolbar, Form } from "rsuite";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name-6">
          <Form.ControlLabel>Category Name</Form.ControlLabel>
          <input
            type="text"
            className="form-control p-2 border solid border-lime-700 rounded-md mt-3 "
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CategoryForm;
