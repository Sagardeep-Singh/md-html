import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor from "./Editor";
import { useState } from "react";

const MdHtml = () => {
  const [value, setValue] = useState("");

  const handleMdChange = (event)=>{
    event.preventDefault();
    setValue(event.target.value);
  };

  const getHtml = (md)=>{
      fetch("http://localhost:8080/html",{
          method:"POST",
          data:{md},
          dataType:"application/json"
      });
  }

  return (
    <Row className="row-cols-1 row-cols-md-2">
      <Col>
        <Editor placeholder="Please enter Markdown here" label="Markdown" value={value} onChange={handleMdChange}/>
      </Col>
      <Col>
        <Editor
          placeholder="Please enter HTML here"
          label="HTML"
          readOnly={true}
          value={value}
        />
      </Col>
    </Row>
  );
};

export default MdHtml;
