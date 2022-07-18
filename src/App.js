import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Board from './components/post_board/Board';
import Scroll from './components/test/Scroll';
import Flex from './components/test/Flex';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import Main from './page/Main';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signIn' element={<SignIn />} />
      <Route path='/signUp' element={<SignUp />} />
    </Routes>

    // <Board />
    // <Scroll />
    // <Flex />
  );
}

export default App;
