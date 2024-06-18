import React from 'react';
import InputButtonComponent from "./component/InputButton"
import Navbar from './component/Navbar';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <InputButtonComponent />
    </div>
  );
}

export default App;
