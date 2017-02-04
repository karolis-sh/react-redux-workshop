import React from 'react';

import Books from './Books';
import BookBooking from './BookBooking';
import './App.css';


const Header = () =>
  <div className='header'>
    Inntec books
  </div>;


const App = () =>
  <div className='app'>
    <Header />
    <div className='app-content'>
      <BookBooking />
      <Books />
    </div>
  </div>;

export default App;
