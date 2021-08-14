import Navigation from "../components/Navigation";
import { connect } from "react-redux";
import { checkAuthenticated, loadCsrfToken } from "../actions/auth";
import { loadProfile } from "../actions/profile";
import { useEffect } from "react";
import AlertMessage from "../components/AlertMessage";

const Layout = ({
  children,
  checkAuthenticated,
  loadProfile,
  loadCsrfToken,
}) => {
  useEffect(() => {
    loadCsrfToken();
    checkAuthenticated();
    loadProfile();
  });

  return (
    <div className="container-fluid m-0 p-2">
      <Navigation />
      <AlertMessage />
      {children}
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  loadProfile,
  loadCsrfToken,
})(Layout);
