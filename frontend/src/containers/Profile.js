import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { saveProfile } from "../actions/profile";

const Login = ({ saveProfile, isAuthenticated, profile }) => {
  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
    new_password2: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    auto_save: "",
  });

  const {
    first_name,
    last_name,
    email,
    phone,
    city,
    auto_save,
    password,
    new_password,
    new_password2,
  } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      password.length > 0 &&
      new_password.length > 0 &&
      new_password === new_password2
    ) {
      saveProfile(
        first_name,
        last_name,
        email,
        phone,
        city,
        auto_save,
        password,
        new_password,
        new_password2
      );
    } else {
      saveProfile(first_name, last_name, email, phone, city, auto_save);
    }
  };

  const handleCheckboxClick = (e) => {
    setFormData({ ...formData, ...{ [e.target.name]: e.target.checked } });
  };

  useEffect(() => {
    setFormData({ ...formData, ...profile });
  },[profile]);

  if (isAuthenticated === false) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container my-3 py-3 rounded bg-light">
      <form onSubmit={handleSubmit}>
        <h2>Login Details</h2>
        <div className="row row-cols-1 row-cols-md-2 g-2">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="dummy"
                name="username"
                value={profile.username}
                minLength="3"
              />
              <label htmlFor="floatingInput">Username</label>
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
                minLength="8"
              />
              <label htmlFor="floatingInput">Password</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="dummy"
                name="new_password"
                value={new_password}
                onChange={handleChange}
                minLength="8"
              />
              <label htmlFor="floatingInput">New Password</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="dummy"
                name="new_password2"
                value={new_password2}
                onChange={handleChange}
                minLength="8"
              />
              <label htmlFor="floatingInput">Confirm New Password</label>
            </div>
          </div>
        </div>

        <h2 className="mt-2">Profile</h2>
        <div className="row row-cols-1 row-cols-md-2 g-2">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="dummy"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                minLength="3"
              />
              <label htmlFor="floatingInput">First Name</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="dummy"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                minLength="8"
              />
              <label htmlFor="floatingInput">Last Name</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="dummy"
                name="phone"
                value={phone}
                onChange={handleChange}
                minLength="8"
              />
              <label htmlFor="floatingInput">Phone</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="dummy"
                name="email"
                value={email}
                onChange={handleChange}
                minLength="8"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="dummy"
                name="city"
                value={city}
                onChange={handleChange}
                minLength="8"
              />
              <label htmlFor="floatingInput">City</label>
            </div>
          </div>
          <div className="col text-center">
            <div className="form-check form-switch my-3 mx-auto d-flex">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={auto_save}
                onChange={handleCheckboxClick}
                name="auto_save"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Auto save
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col text-center">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile,
});

export default connect(mapStateToProps, { saveProfile })(Login);
