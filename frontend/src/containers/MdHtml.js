/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import cookies, { set } from "js-cookie";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import {
  createDocument,
  deleteDocument,
  saveDocument,
} from "../actions/document";
import Editor from "../components/Editor";

const MdHtml = ({
  isAuthenticated,
  deleteDocument,
  createDocument,
  saveDocument,
}) => {
  const [mdValue, setMdValue] = useState("__Please _Type_ ~Here~__");
  const [htmlValue, setHtmlValue] = useState(mdValue);
  const [name, setName] = useState("");
  // const [autoSave, setAutoSave] = useState("");
  const [sendToDocuments, setSendToDocuments] = useState(false);
  const { id = null } = useParams();

  const getHtml = async (md) => {
    const url = `${process.env.REACT_APP_API_URL}/html`;
    const data = {
      md: md,
    };

    return axios.post(url, data, {
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
    });
  };

  const getMd = async (html) => {
    const url = `${process.env.REACT_APP_API_URL}/md`;
    const data = {
      html: html,
    };

    return axios.post(url, data, {
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
    });
  };

  const getDocument = async (id) => {
    const url = `${process.env.REACT_APP_API_URL}/documents/${id}`;
    return axios.get(url, {}, {});
  };

  const handleMdChange = (event) => {
    setMdValue(event.target.value);
    getHtml(event.target.value).then((res) => setHtmlValue(res.data));
  };

  const handleHtmlChange = (event) => {
    setHtmlValue(event.target.value);
    getMd(event.target.value).then((res) => setMdValue(res.data));
  };

  useEffect(() => {
    getHtml(mdValue).then((res) => setHtmlValue(res.data));
  }, []);

  useEffect(() => {
    id !== null &&
      getDocument(id).then((res) => {
        setMdValue(res.data.md);
        setName(res.data.document.name);
        // setAutoSave(res.data.document.auto_save);
        getHtml(res.data.md).then((res) => setHtmlValue(res.data));
      });
  }, [id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === null) {
      createDocument(name, mdValue);
      setSendToDocuments(true);
    } else {
      saveDocument(id, name, mdValue);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deleteDocument(id);
    setSendToDocuments(true);
  };

  // const handleCheckboxClick = (e) => {
  //   setAutoSave(!autoSave);
  // };

  // useEffect(() => {
  //   if (!autoSave) {
  //     return;
  //   }

  //   const setLoop = () => {
  //     return setTimeout(() => {
  //       console.log(mdValue);
  //       saveDocument(
  //         id,
  //         name.length ? name : `Doc_${id}`,
  //         mdValue,
  //         autoSave,
  //         false
  //       );
  //       console.log("Saved");
  //       setLoop();
  //     }, 5 * 1000);
  //   };

  //   let lTimer = setLoop();

  //   return () => {
  //     clearInterval(lTimer);
  //     console.log("Timer Stopped");
  //   };
  // }, [autoSave]);

  if (sendToDocuments) {
    return <Redirect to="/documents" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {isAuthenticated ? (
        <>
          <div className="row p-2">
            <div className="col-4 mx-auto">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Document Name"
                onChange={handleNameChange}
                required
              />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-6 mx-auto text-center">
              {/* {id ? (
                <div className="form-check form-switch m-3 d-inline-block">
                  <input
                    className="form-check-input mx-1"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked={autoSave}
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
              ) : (
                <></>
              )} */}
              <button className="btn btn btn-outline-primary" type="submit">
                {id ? "Update" : "Create"}
              </button>
              {id ? (
                <button
                  className="btn btn-link text-danger ms-1"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="row row-cols-1 row-cols-md-2 g-2">
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
          <div
            id="preview"
            style={{ minHeight: "400px" }}
            className="bg-white p-2 border rounded"
          >
            {parse(DOMPurify.sanitize(htmlValue))}
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  deleteDocument,
  createDocument,
  saveDocument,
})(MdHtml);
