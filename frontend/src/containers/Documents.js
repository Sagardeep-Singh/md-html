import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Documents = () => {
  const [list, setList] = useState([]);

  const loadDocuments = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/documents/`,
      {},
      {
        Accept: "application/json",
        "Content-type": "application/json",
      }
    );

    setList(res.data);
  };

  useEffect(() => {
    loadDocuments();
  });

  return (
    <ul>
      {list.map((item) => (
        <li>
          <a href={"/documents/" + item.id}>{item.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default Documents;
