/* eslint-disable react-hooks/exhaustive-deps */
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import Editor from "../components/Editor";

const axios = require('axios');

const MdHtml = () => {
  const [mdValue, setMdValue] = useState("__Please _Type_ ~Here~__");
  const [htmlValue, setHtmlValue] = useState(mdValue);

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

  const handleMdChange = (event) => {
    setMdValue(event.target.value);
    getHtml(event.target.value)
      .then(res => setHtmlValue(res.data));
  };

  const handleHtmlChange = (event) => {
    setHtmlValue(event.target.value);
    getMd(event.target.value)
      .then(res => setMdValue(res.data));
  };

  // useEffect(() => {
  //   getHtml(mdValue)
  //     .then(res => setHtmlValue(res.data));
  // }, []);

  return (<>
    <div className="row div-divs-1 div-divs-md-2 g-2">
      <div className="col">
        <Editor
          placeholder="Please enter Markdown here"
          label="Markdown"
          value={mdValue}
          onChange={handleMdChange}
        />
      </div>
      <div className="col">
        <Editor
          placeholder="Please enter HTML here"
          label="HTML"
          value={htmlValue}
          onChange={handleHtmlChange}
        />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <h3 className="pt-2 text-muted">Preview</h3>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div id="preview" style={{ minHeight: "500px" }} className="bg-white p-2 border rounded">{parse(DOMPurify.sanitize(htmlValue))}</div>
      </div>
    </div>
  </>);
};

export default MdHtml;
