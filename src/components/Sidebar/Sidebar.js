import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Sidebar(props) {
  const [signIn, setSignIn] = React.useState(false);
  const [openSignInForm, setOpenSignInForm] = React.useState(false);
  const [openSignUpForm, setOpenSignUpForm] = React.useState(false);

  const [category, setCategory] = React.useState([]);

  const [selectCategory, setSelectCategory] = React.useState('');

  const signOut = () => {
    sessionStorage.removeItem('signIn');
    setSignIn(false);
  }

  const getCategory = async() => {
    const tmp = await axios.get('/api/category');
    setCategory(tmp.data);
  }

  React.useEffect(() => {
    if(sessionStorage.signIn) {
      setSignIn(true)
    }
    getCategory();
  }, [])

  return (
    <>
      {signIn ? 
        <>
          {sessionStorage.user &&
            <div>
              {sessionStorage.getItem('user')+
              sessionStorage.getItem('userName')+
              sessionStorage.getItem('userLevel')}
            </div>
          }
          <Button variant="outlined" onClick={()=>{signOut();}}>로그아웃</Button>
        </>
        : 
        <>
          <div style={{padding:'10px'}} />
          <Button variant="outlined" onClick={()=>{setOpenSignInForm(true)}}>로그인</Button>
          {openSignInForm && 
            <Navigate to="/signIn" replace={true} />
          }
          <div style={{padding:'10px'}} />
          <Button variant="outlined" onClick={()=>{setOpenSignUpForm(true)}}>회원가입</Button>
          {openSignUpForm && 
            <Navigate to="/signUp" replace={true} />
          }
        </>
      }

      <div className='category'>
        <ui>
          <li>
            <u onClick={() => {props.changeCategory('all')}}>전체 보기</u><hr/>
          </li>
          {category.length > 0 ?
            category.map((el, key) => {
              return(
                <li key={key}> <u onClick={() => {props.changeCategory(el.name)}}> {el.name} </u> </li>
              )
            })
            : null}
        </ui>
        <u onClick={() => {sessionStorage.removeItem('category');}}>취소</u>
      </div>


    </>
  )
}