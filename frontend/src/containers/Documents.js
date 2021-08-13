import React from 'react'
import { useEffect, useState } from "react";

const Documents= () => {
    const [list, setList] = useState([{
        name: "doc1",
        id: 1
    }]);

    return (
        <ul>
            {
                list.map(item => <li><a href={"/document/" + item.id} >{item.name}</a></li>)
            }
        </ul >
    );
};

export default Documents;