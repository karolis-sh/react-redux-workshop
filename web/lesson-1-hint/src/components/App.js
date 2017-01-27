import React from 'react';

import Books from './Books';
import books from '../book.fixture';
import './App.css';

const Header = () =>
  <div className='header'>
    Inntec books
  </div>;


const App = () =>
  <div className='app'>
    <Header />
    <div className='app-content'>
      <Books books={books} />
    </div>
  </div>;

export default App;
