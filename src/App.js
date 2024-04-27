import './App.css';
import { SimpleSlider } from './components/Slider';
import Header from './components/Header';
import './header.css';
import FilmDetails from './components/FilmDetails';
import { Link, Route } from 'react-router-dom';
import React, { useState } from 'react';


function App() {
  return (
    <div className="App">
      <Header/>
      <hr className="separator"/>
      <SimpleSlider/>
      
    </div>
  );
}

export default App;
