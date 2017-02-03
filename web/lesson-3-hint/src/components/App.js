import React from 'react';
import {connect} from 'react-redux';

import {loadBooks} from '../actions/book';
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
    const {initAppState} = props;
    initAppState();
  }

  onRefresh = () => api.getBooks().then(response => this.setState({books: response}));

  render() {
    return (
      <div className='app'>
        <Header />
        <div className='app-content'>
          <Books onRefresh={this.onRefresh} />
        </div>
      </div>);
  }
}

App.propTypes = {
  initAppState: React.PropTypes.func.isRequired,
};

const AppContainer = connect(
  null,
  dispatch => ({
    initAppState() {
      dispatch(loadBooks());
    },
  }),
)(App);

export default AppContainer;
