import { NavLink, Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navigation = ({ logout, isAuthenticated, username }) => {
  const login_signup_links = (
    <>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link">
          Sign up
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
    </>
  );

  const logout_links = (
    <>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-link">
          {username}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/" className="nav-link" onClick={logout}>
          Logout
        </NavLink>
      </li>
    </>
  );

  // return <Navbar bg="light" variant="light" expand="lg" classNameName="p-2" sticky>
  //     <Navbar.Brand >MarkDown HTML Switch</Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //     <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav classNameName="me-auto">
  //             <NavLink to="/">Home</NavLink>
  //             {true ? <NavLink to="/document">Documents</NavLink> : <></>}
  //         </Nav>
  //         <Nav>
  //             {true ? login_signup_links : logout_links}
  //         </Nav>
  //     </Navbar.Collapse>
  // </Navbar>

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MD-HTML-Editor
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/documents">
                  Documents
                </NavLink>
              </li>
            ) : (
              <></>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/editor">
                Editor
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav me- mb-2 mb-lg-0">
            {isAuthenticated ? logout_links : login_signup_links}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.profile.username,
});

export default connect(mapStateToProps, { logout })(Navigation);
