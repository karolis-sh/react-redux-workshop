import React from 'react';

import Books from './Books';
import api from '../api';
import './App.css';


const Header = () =>
  <div className='header'>
    Inntec books
  </div>;


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {books: []};
  }

  componentDidMount() {
    api.getBooks().then(response => this.setState({books: response}));
  }

  onRefresh = () => api.getBooks().then(response => this.setState({books: response}));

  render() {
    const {books} = this.state;
    return (
      <div className='app'>
        <Header />
        <div className='app-content'>
          <Books books={books} onRefresh={this.onRefresh} />
        </div>
      </div>);
  }
}

export default App;
