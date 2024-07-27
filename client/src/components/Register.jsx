import React, { useState } from "react";
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    console.log(formData);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) {
        toast.success("Register Successful");
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal server error");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center pt-5">
        <div className="w-1/3">
          <h1 className="font-semibold my-3 text-3xl text-center">Register</h1>
          <form method="post">
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="input"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit" onClick={handleSubmit} className="btn">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
