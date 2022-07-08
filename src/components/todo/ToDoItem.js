import React, { useState } from "react";
// import "./ToDoItem.css";

const ToDoItem = (props) => {
  const { updateToDoItem, deleteToDoItem } = props;
  const [ id, setId ] = useState(props.item.ID);
  const [ toDo, setToDo ] = useState(props.item.TODO);
  const [ tmpToDo, setTmpToDo ] = useState('');

  const onChangeHandler = (e) => {
    setTmpToDo(e.target.value);
  }

  const updateToDoItemHandler = () => {
    updateToDoItem(id,tmpToDo);
    setToDo(tmpToDo);
    setTmpToDo('');
  }

  return (
    <div className="list-item">
      <p>
        <input 
            className='input-text'
            value={tmpToDo}
            type='text'
            onChange={onChangeHandler}
            placeholder={toDo}
          />
      </p>
      <button className='item-update' onClick={() => updateToDoItemHandler()}> ↺ </button>
      <button className='item-delete' onClick={() => deleteToDoItem(id)} > - </button>
    </div>
  );
};

export default ToDoItem;
