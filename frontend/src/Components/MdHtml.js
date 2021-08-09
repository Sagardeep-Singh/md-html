import parse from 'html-react-parser';
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Editor from "./Editor";
import DOMPurify from 'dompurify';

const axios = require('axios');

const MdHtml = () => {
  const [mdValue, setMdValue] = useState("Some");
  const [htmlValue, setHtmlValue] = useState(mdValue);

  const handleMdChange = (event) => {
    event.preventDefault();
    setMdValue(event.target.value);
    getHtml(event.target.value)
      .then(res => setHtmlValue(res.data));
  };

  const handleHtmlChange = (event) => {
    event.preventDefault();
    setHtmlValue(event.target.value);
    getMd(event.target.value)
      .then(res => setMdValue(res.data));
  };

  const getHtml = async (md) => {
    const url = "http://192.168.1.19:8000/html";
    const data = {
      md: md,
    };

    return axios.post(url, data);
  };

  const getMd = async (html) => {
    const url = "http://192.168.1.19:8000/md";
    const data = {
      html: html,
    };

    return axios.post(url, data);
  };

  return (<>
    <Row className="row-cols-1 row-cols-md-2">
      <Col>
        <Editor
          placeholder="Please enter Markdown here"
          label="Markdown"
          value={mdValue}
          onChange={handleMdChange}
        />
      </Col>
      <Col>
        <Editor
          placeholder="Please enter HTML here"
          label="HTML"
          value={htmlValue}
          onChange={handleHtmlChange}
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <h3 className="pt-2 text-muted">Preview</h3>
      </Col>
    </Row>
    <Row>
      <Col>
        <div id="preview" style={{ minHeight: "30vh" }} className="bg-white p-2">{parse(DOMPurify.sanitize(htmlValue))}</div>
      </Col>
    </Row>
  </>);
};

export default MdHtml;
