import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className=" bg-secondary p-3 "
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-primary p-2 rounded-lg hover:bg-text hover:text-white "
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
