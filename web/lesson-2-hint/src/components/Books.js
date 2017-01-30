import React from 'react';
import classNames from 'classnames';

import config from '../config';
import BookBooking from './BookBooking';
import './Books.css';


const Book = ({isSelected, isBorrowed, id, onSelect, cover, title, author}) =>
  <a
    className={classNames('book', isSelected && 'book--selected', isBorrowed && 'book--borrowed')}
    onClick={() => onSelect(id)} tabIndex='0'
  >
    <div className='book__cover'>
      <img src={config.baseUrl + cover} alt={title} />
    </div>
    <div className='book__title'>{title}</div>
    <div className='book__author'>{author}</div>
  </a>;

Book.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  cover: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  isBorrowed: React.PropTypes.bool.isRequired,
};

const BookFilter = ({title, avalableOnly, onFilterUpdate}) =>
  <div className='book-filter'>
    Filter:
    <input
      className='book-filter__title-input' placeholder='Title' value={title || ''}
      onChange={e => onFilterUpdate('title', e.target.value)}
    />
    <input
      id='availableFilter' type='checkbox' className='book-filter__available-input' checked={avalableOnly}
      onChange={e => onFilterUpdate('avalableOnly', e.target.checked)}
    />
    <label htmlFor='availableFilter'>Available only</label>
  </div>;

BookFilter.propTypes = {
  title: React.PropTypes.string,
  avalableOnly: React.PropTypes.bool,
  onFilterUpdate: React.PropTypes.func.isRequired,
};

BookFilter.defaultProps = {
  title: null,
  avalableOnly: false,
};


class BookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {filter: {}, selectedBook: null};
  }

  onFilterUpdate = (field, val) => {
    const filter = {...this.state.filter};
    filter[field] = val;
    this.setState({filter});
  }

  onBookSelect = bookId => this.props.books.forEach(book => book.id === bookId && this.setState({selectedBook: book}));

  render() {
    const {books} = this.props;
    const {filter, selectedBook} = this.state;
    const filteredBooks = books
      .filter(item => filter.avalableOnly !== true || (filter.avalableOnly && item.borrowedBy == null))
      .filter(item => !filter.title || (item.title.toLowerCase().includes(filter.title.toLowerCase())));
    return (
      <div>
        <div className='books__order'>
          {selectedBook && <BookBooking book={selectedBook} />}
        </div>
        <div className='books__header'>
          <h2>Book list</h2>
          <BookFilter {...filter} onFilterUpdate={this.onFilterUpdate} />
        </div>
        <div className='books__list'>
          {filteredBooks.map(book =>
            <Book
              key={book.id} {...book} onSelect={this.onBookSelect}
              isSelected={selectedBook ? selectedBook.id === book.id : false}
              isBorrowed={book.borrowedBy != null}
            />,
          )}
        </div>
      </div>
    );
  }
}

BookList.propTypes = {
  books: React.PropTypes.arrayOf(React.PropTypes.shape({
    cover: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
  })),
};

BookList.defaultProps = {
  books: [],
};

export default BookList;
