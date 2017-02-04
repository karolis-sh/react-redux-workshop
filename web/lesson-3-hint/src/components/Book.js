import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {selectBook} from '../actions/book';
import config from '../config';
import './Books.css';


const Book = ({isSelected, borrowedBy, id, onSelect, cover, title, author, borrower}) =>
  <a
    className={classNames('book', isSelected && 'book--selected', borrowedBy != null && 'book--borrowed')}
    onClick={() => onSelect(id)} tabIndex='0'
  >
    <div className='book__cover'>
      <img src={config.baseUrl + cover} alt={title} />
    </div>
    <div className='book__title'>{title}</div>
    <div className='book__author'>{author}</div>
    {borrower && <div className='book__borrower'>{`${borrower.name} ${borrower.surname}`}</div>}
  </a>;

Book.propTypes = {
  id: React.PropTypes.number.isRequired,
  cover: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  borrowedBy: React.PropTypes.number,
  onSelect: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  borrower: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    surname: React.PropTypes.string.isRequired,
  }),
};

Book.defaultProps = {
  borrowedBy: null,
  borrower: null,
};


const BookContainer = connect(
  (state, ownProps) => {
    let isSelected = false;
    let borrower = null;

    if (state.book.selectedBook && state.book.selectedBook.id === ownProps.id) isSelected = true;

    state.employee.employees.forEach((employee) => {
      if (employee.id === ownProps.borrowedBy) borrower = employee;
    });

    return {isSelected, borrower};
  },
  dispatch => ({
    onSelect(bookId) {
      dispatch(selectBook(bookId));
    },
  }),
)(Book);

export default BookContainer;
