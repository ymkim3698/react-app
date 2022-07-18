import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Sidebar(props) {
  const [signIn, setSignIn] = React.useState(false);

  const signOut = () => {
    sessionStorage.removeItem('signIn');
    setSignIn(false);
  }

  React.useEffect(() => {
    console.log(sessionStorage.login);
    if(sessionStorage.signIn) {
      setSignIn(true)
    }
  }, [])

  return (
    <>
      {signIn ? 
        <h1 onClick={() => {signOut();}}>로그아웃</h1>
        : 
        <>
          <div style={{padding:'10px'}} />
          <Button variant="outlined" onClick={()=>{return (<Navigate to="/signIn" replace={true} />)}}>Outlined</Button>
          <Link variant='contained' to='/signIn'>로그인</Link>
          <div style={{padding:'10px'}} />
          <Link variant='contained' to='/signUp'>회원가입</Link>
        </>
      }
    </>
  )
}