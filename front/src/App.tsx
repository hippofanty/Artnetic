import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';

import { Main } from './components/Main/Main';

import Profile from './components/Profile/Profile';


function App() {
  return (
    <div>
      <Header />

      <Main />

      <Profile/>

    </div>
  );
}

export default App;
