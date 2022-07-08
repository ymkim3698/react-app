import { Routes, Route } from 'react-router-dom';
import ToDo from './ToDo';
import ShowDB from './ShowDB';
// import './App.css';

function MainToDo() {
  return (
    <Routes>
      <Route path="/" element={<ToDo />} />
      <Route path="/database" element={<ShowDB />} />
    </Routes>
  );
}

export default MainToDo; 