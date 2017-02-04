import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';

import {loadBooks} from '../actions/book';
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
    const {book: {id, borrowedBy}, onSubmitted} = this.props;
    const {employeeId} = this.state;
    if (id && (employeeId || borrowedBy)) {
      if (borrowedBy) {
        api.doUnbooking(id).then(onSubmitted);
      } else {
        api.doBooking(id, employeeId).then(onSubmitted);
      }
    }
  }

  render() {
    const {book: {title, cover, author, borrowedBy}, employees} = this.props;
    const {employeeId} = this.state;
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
    id: React.PropTypes.number.isRequired,
    cover: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    borrowedBy: React.PropTypes.number,
  }).isRequired,
  employees: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    surname: React.PropTypes.string.isRequired,
  })),
  onSubmitted: React.PropTypes.func.isRequired,
};

BookBooking.defaultProps = {
  employees: [],
};


const BookBookingWrapper = props => props.book ? <BookBooking {...props} /> : null; // eslint-disable-line

const BookBookingContainer = connect(
  state => ({
    book: state.book.selectedBook,
    employees: state.employee.employees,
  }),
  dispatch => ({
    onSubmitted() {
      dispatch(loadBooks());
    },
  }),
)(BookBookingWrapper);

export default BookBookingContainer;
