import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Loader } from "rsuite";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center">
          redirecting to you in{" "}
          <span className="text-red-500 animate-pulse">{count}</span> seconds{" "}
        </h1>
        <div className="spinner-border" role="status">
          <span className="text-red-500">
            <Loader speed="fast" size="md" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
