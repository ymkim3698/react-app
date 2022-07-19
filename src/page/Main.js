import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MainTabs from '../components/Tabs/MainTabs';
import './main.css';

export default function Main(props) {
  const [category, setCategory] = React.useState();
  const [reload, setReload] = React.useState();

  const changeCategory = (val) => {
    sessionStorage.setItem('category', val);
    console.log(val);
    setCategory(val);
  }

  React.useEffect(()=>{
    setReload();
  },[category]);

  return (
    <>
    <div className='main'>
      <div className='sidebar'>
        <Sidebar changeCategory={changeCategory}/>
      </div>
      
      <div className='maintabs'>
        <MainTabs/>
      </div>
    </div>
    </>
  )
}