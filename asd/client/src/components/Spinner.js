import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <>
      <div
        className="text-center justify-center items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="relative animate-pulse top-[30rem] text-center">
          We are redirecting you in{" "}
          <span className="text-red-600">{count}</span> seconds
        </h1>
        <div className="relative spinner-border" role="status">
          <span class="visually-hidden absolute left-[65rem] top-[30rem] ">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
