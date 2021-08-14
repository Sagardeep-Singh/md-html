import React, { useEffect } from "react";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";

const AlertMessage = ({ message, clearMessage }) => {
  const handleClick = (e) => clearMessage();

  useEffect(() => {
    if (message.display === "d-none") {
      return;
    }

    const timer = setTimeout(() => {
      clearMessage();
    }, 5000);

    return () => {
      clearTimeout(timer);
      console.log("Alert time cleared " + timer);
    };
  }, [message]);

  return (
    <div
      className={`alert alert-${message.type} alert-dismissible ${message.display} m-4`}
    >
      {message.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleClick}
      ></button>
    </div>
  );
};

const mapStateToProps = (state) => ({ message: state.message });

export default connect(mapStateToProps, { clearMessage })(AlertMessage);
