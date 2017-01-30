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
    const {book: {id, borrowedBy}} = this.props;
    const {employeeId} = this.state;
    e.preventDefault();
    if (id && (employeeId || borrowedBy)) {
      if (employeeId) {
        api.doBooking({bookId: id, employeeId}).then(() => console.log('Booked!'));
      } else {
        api.doUnbooking({bookId: id, employeeId}).then(() => console.log('Un-Booked!'));
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
};

export default BookBooking;
