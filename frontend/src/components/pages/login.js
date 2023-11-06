import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { COLORS, DIMENTIONS } from "../../default-values/constants";
import { login } from "../../default-values/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);
    axios
      .post("http://localhost:3001/auth/login", {
        email: formData.username,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("LoggedIn", true);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: COLORS.gray_5,
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          className="me-2"
          style={{
            backgroundColor: COLORS.gray_1,
            height: "70vh",
            width: "35%",
          }}
        ></div>

        {/* Right form*/}
        <div
          className="d-flex flex-column align-items-center p-5"
          style={{
            backgroundColor: COLORS.white,
            height: "70vh",
            width: "35%",
            borderRadius: DIMENTIONS.radius_1,
          }}
        >
          <h3>Welcome</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mt-3">
                <label htmlFor="email" className="form-label mb-1">
                  Username
                </label>
                <input
                  className="form-control"
                  id="email"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="password" className="form-label mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <a href="#">Fogot password ?</a>
              </div>

              <div className="col-12 mt-5">
                <button type="submit">Sign In</button>
              </div>

              <div className="mt-3 d-flex justify-content-end">
                <a href="#">Register</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
