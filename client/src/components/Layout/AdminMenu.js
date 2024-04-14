import React from "react";
import { Modal, Button, Loader } from "rsuite";
import { ButtonToolbar, FlexboxGrid } from "rsuite";
import { Link } from "react-router-dom";


const AdminMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState(0);
  const handleOpenACC = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };
  return (
    <div>
      <FlexboxGrid className="absolute left-[10rem]" justify="space-around">
        <FlexboxGrid.Item>
          <div>
            <ButtonToolbar className="flex flex-col">
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard">Profile</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard/create-cate">CREATE CATEGORY</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard/create-pro">CREATE PRODUCT</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard/view-pro">VIEW PRODUCTS</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/admindashboard/view-orders">VIEW ORDERS</Link>
              </Button>
              <Button color="green" appearance="ghost">
                <Link to="/chat-auth">CHAT ROOM</Link>
              </Button>
            </ButtonToolbar>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <div className="absolute top-[36rem] left-3">
            <Button onClick={handleOpenACC} color="cyan" appearance="primary">
              Setting
            </Button>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Modal
        open={open}
        onClose={handleClose}
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
      >
        <Modal.Body>
          {rows ? (
            <div className=" flex flex-col items-center ">
              <div className="mb-3">
                <Button onClick={handleOpenACC} appearance="primary">
                  <Link to="/userdashboard/update-acc">
                    Update Your Account Details
                  </Link>
                </Button>
              </div>
              <div className="mb-3">
                <Button appearance="primary">
                  <Link to="/forgot">Reset Your Password</Link>
                </Button>
              </div>
              <div>
                <Button appearance="primary">
                  <Link to="/userdashboard/reset-ans">Reset Your Answer</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Loader size="md" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminMenu;
