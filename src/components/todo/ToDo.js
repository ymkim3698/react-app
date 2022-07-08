import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ToDoItem from './ToDoItem';
import axios from 'axios';
// import './ToDo.css';

const ToDo = () => {
  const [ showError, setShowError ] = useState(false);
  const [ toDoItem, setToDoItem ] = useState({
    id : 0,
    toDo : ''
  });
  const [ list, setList ] = useState([]);

  const initToDoItem = () => {
    axios.get("/maxId").then((res) => {
      const tmpId = parseInt(Object.values(res.data.rs_value.rows[0]));
      setToDoItem({...toDoItem, id : (isNaN(tmpId) ? 1 : tmpId + 1)});
    });
  };

  const onChangeHandler = (e) => {
    setToDoItem({...toDoItem, toDo : e.target.value});
  }

  const onKeyPressHandler = (e) => {
    if(e.key === 'Enter') {
      insertToDoItem();
    }
  }

  const insertToDoItem = () => {
    if (!toDoItem.toDo) {
      displayError();
      return;
    }
    axios.post("/insertToDo", {id:toDoItem.id, toDo:toDoItem.toDo});
    console.log(toDoItem.id + ' : ' + toDoItem.toDo);
    resetToDoItem();
    loadList();
  }

  const resetToDoItem = () => {
    setToDoItem({id : toDoItem.id+1, toDo : ''});
  }

  const loadList = () => {
    axios.get("/getToDoList").then((res) => {
      // alert(JSON.stringify(res.data.rs_value))
      setList(res.data.rs_value.rows);
    });
  }

  const deleteToDoItem = (id) => {
    axios.post("/deleteToDo", {id:id});
    console.log(id);
    loadList();
  }

  const updateToDoItem = (id, toDo) => {
    axios.post("/updateToDo", {id:id, toDo:toDo});
    console.log(id + ' : ' + toDo);
    loadList();
  }

  const displayError = () => {
    setShowError(true);
    const clearTimer = setTimeout(() => setShowError(false), 3000);
    return () => clearTimeout(clearTimer);
  };

  // const creact_list = () => {
  //   return (
  //     <>
  //       {list.map((item) => {
  //         return <ToDoItem item={item} updateToDoItem={updateToDoItem} deleteToDoItem={deleteToDoItem} />;
  //       })}
  //     </>
  //   )
  // }

  useEffect(()=>{
    initToDoItem();
    loadList();
  },[]);


  return (
    <div className='main'>
      <h1 className='main-header'>ToDo</h1>
      <div className='main-container'>
        <div className='container-list'>
          {list.map((item) => {
            return <ToDoItem item={item} updateToDoItem={updateToDoItem} deleteToDoItem={deleteToDoItem} />;
          })}
        </div>
        <div className='container-input'>
          <input 
            className='input-box'
            type='text'
            value={toDoItem.toDo}
            placeholder='Enter What To Do ...'
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
          />
          <button
            className='input-button'
            onClick={insertToDoItem}>+</button>
        </div>
        <div className='container-err'>
          {showError && <p>Please enter a todo!</p>}
        </div>
      </div>

      <button className='main-refresh' style={{width:'150px'}} onClick={loadList}>Refresh</button>

      <ul style={{'list-style':'none'}}>
        <li>
          <Link to='/database'>Database</Link>
        </li>
      </ul>
    </div>
  );
};

export default ToDo;