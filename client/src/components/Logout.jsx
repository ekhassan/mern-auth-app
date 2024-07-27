import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        navigate("/login", { replace: true });
        if (!res.ok) {
          console.error(res.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return;
  <></>;
};

export default Logout;
