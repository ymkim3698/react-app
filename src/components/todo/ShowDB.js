import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './showDB.css'

const ShowDB = () => {
  const [ list, setList ] = useState([]);

  const loadList = () => {
    axios.get("/getToDoList").then((res) => {
      setList(res.data.rs_value.rows);
    });
  }

  useEffect(()=>{
    loadList();
  },[]);

  return (
    <div>
      <table className='show-db'>
        <thead>
          <th>ID</th>
          <th>TODO</th>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
            <tr>
              <td>{item.ID}</td>
              <td>{item.TODO}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
      <Link to='/'>toDoList</Link>
    </div>
  );
};

export default ShowDB;