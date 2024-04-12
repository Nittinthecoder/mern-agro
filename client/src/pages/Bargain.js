import React from "react";
import { Link } from "react-router-dom";
import { Button } from "rsuite";

const Bargain = () => {
  return (
    <div>
      <Button appearance="ghost">
        <Link to="/chat-auth">Bargain</Link>
      </Button>
    </div>
  );
};

export default Bargain;
