import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";

const Editor = ({ label, placeholder, readOnly, value, onChange}) => {
  return (
    <FloatingLabel controlId="floatingTextarea2" label={label}>
      <Form.Control
        as="textarea"
        style={{ height: "50vh" }}
        placeholder={placeholder}
        readOnly={readOnly}
        className="bg-white"
        onChange={onChange}
        value={value}
      ></Form.Control>
    </FloatingLabel>
  );
};

export default Editor;
