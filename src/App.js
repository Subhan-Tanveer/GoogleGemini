import logo from './logo.svg';
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Main from './components/Main/Main';
// import Sidebar from './components/Sidebar/sidebar';

function App() {
  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  );
}

export default App;
