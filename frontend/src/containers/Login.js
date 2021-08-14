import React, { useState } from "react";
import { login } from "../actions/auth";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length > 3 && password.length > 0) {
      login(username, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container my-3 py-3 rounded bg-light">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row row-cols-1 row-cols-md-2 g-2">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                
                placeholder="dummy"
                name="username"
                value={username}
                onChange={handleChange}
                required
                minLength="3"
              />
              <label htmlFor="floatingInput">
                Username<i className="text-danger">*</i>
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                
                placeholder="dummy"
                name="password"
                value={password}
                onChange={handleChange}
                required
                minLength="8"
              />
              <label htmlFor="floatingInput">
                Password<i className="text-danger">*</i>
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col text-center">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
