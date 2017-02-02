import React from 'react';
import Select from 'react-select';

import config from '../config';
import api from '../api';
import './Books.css';


class BookBooking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {employees: [], employeeId: null};
  }

  componentDidMount() {
    api.getEmployees().then(response => this.setState({employees: response}));
  }

  onEmplyeeSelect = ({value}) => this.setState({employeeId: value});

  onSubmit = (e) => {
    e.preventDefault();
    const {book: {id, borrowedBy}, onRefresh} = this.props;
    const {employeeId} = this.state;
    if (id && (employeeId || borrowedBy)) {
      if (borrowedBy) {
        api.doUnbooking(id).then(onRefresh);
      } else {
        api.doBooking(id, employeeId).then(onRefresh);
      }
    }
  }

  render() {
    const {book: {title, cover, author, borrowedBy}} = this.props;
    const {employees, employeeId} = this.state;
    return (
      <form className='book-booking'>
        <div className='book-booking__cover'>
          <img src={config.baseUrl + cover} alt={title} />
        </div>
        <div>
          <h3>{title}</h3>
          <div>{author}</div>
          <div className='book-booking__form'>
            <Select
              options={employees.map(item => ({value: item.id, label: `${item.name} ${item.surname}`}))}
              onChange={this.onEmplyeeSelect} value={employeeId || borrowedBy} disabled={borrowedBy != null}
            />
            <br />
            <button onClick={this.onSubmit} disabled={employeeId == null && borrowedBy == null}>
              {borrowedBy ? 'Un-book it!' : 'Book it!'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

BookBooking.propTypes = {
  book: React.PropTypes.shape({
    cover: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
  }).isRequired,
  onRefresh: React.PropTypes.func.isRequired,
};

export default BookBooking;
