import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/get-user", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.ok) {
        // console.log(res);
        setUser(res.user);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, [navigate]);

  return (
    <>
      <header className="w-full px-10 bg-violet-600 py-4 text-white font-semibold fixed">
        <nav className="flex justify-between items-center">
          <div>
            <NavLink to="/">
              <h1 className="text-xl">Auth App</h1>
            </NavLink>
          </div>
          <div className="flex items-center gap-1">
            <NavLink
              to="/home"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active-nav-link"
                  : "nav-link"
              }
            >
              Home
            </NavLink>
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "active-nav-link"
                      : "nav-link"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "active-nav-link"
                      : "nav-link"
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <h1 className="bg-violet-500 ring-2 ring-violet-700 px-5 py-1 rounded-full">
                  {user.email}
                </h1>
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
