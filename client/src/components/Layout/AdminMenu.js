import React from "react";

import { Button, ButtonToolbar, FlexboxGrid } from "rsuite";
import { Link } from "react-router-dom";



const AdminMenu = () => {
  return (
    <div>
      <FlexboxGrid className="absolute left-[10rem]" justify="space-around">
        <FlexboxGrid.Item>
          <div>
            <ButtonToolbar className="flex flex-col">
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard/create-cate" >CREATE CATEGORY</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard/create-pro" >CREATE PRODUCT</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard/view-pro" >VIEW PRODUCTS</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link>ALL USERS</Link>
              </Button>
            </ButtonToolbar>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <div className="absolute top-[36rem] left-3">
            <Button color="cyan" appearance="primary">
              <Link to="/admindashboard/admin-set">Setting</Link>
            </Button>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};

export default AdminMenu;
