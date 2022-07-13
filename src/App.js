import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainTabs from './components/Tabs/MainTabs';
import Board from './components/post_board/Board';
import Main from './components/test/Main';
import Flex from './components/test/Flex';
import SignIn from './components/login/SignIn';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainTabs />} />
      <Route path='/signIn' element={<SignIn />} />
    </Routes>

    // <Board />
    // <Main />
    // <Flex />
  );
}

export default App;
