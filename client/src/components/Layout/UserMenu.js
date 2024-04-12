import React from "react";

import { Button, ButtonToolbar, FlexboxGrid } from "rsuite";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <FlexboxGrid className="absolute left-[10rem]" justify="space-around">
        <FlexboxGrid.Item>
          <div>
            <ButtonToolbar className="flex flex-col">
              <Button color="green" appearance="ghost">
                <Link to="/userdashboard/profile">PROFILE</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/userdashboard/orders">ORDERS</Link>
              </Button>
            </ButtonToolbar>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <div className="absolute top-[36rem] left-3">
            <Button color="cyan" appearance="primary">
              Setting
            </Button>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};

export default UserMenu;
