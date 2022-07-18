import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MainTabs from '../components/Tabs/MainTabs';
import './main.css';

export default function Main(props) {
  return (
    <>
    <div className='main'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      
      <div className='tabs'>
        <MainTabs/>
      </div>
    </div>
    </>
  )
}