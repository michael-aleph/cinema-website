import './App.css';
import { SimpleSlider } from './components/Slider';
import Header from './components/Header';
import './header.css';
import FilmDetails from './components/FilmDetails';
import BookingPage from './components/BookingPage'; // Assuming BookingPage.js is in components folder
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>  {/* BrowserRouter should wrap all routing-related components */}
        <Header />
        <hr className="separator" />
        <Routes>  {/* All Route components should be within Routes */}
          <Route path="/" element={<SimpleSlider />} />  {/* Default or home route */}
          <Route path="/films/:id" element={<FilmDetails />} />  {/* Use 'element' prop to define the component to render */}
          <Route path="/booking/:filmId/:sessionTime/:title/:age" element={<BookingPage />} /> {/* New route for booking */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
