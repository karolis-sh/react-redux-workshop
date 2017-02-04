import React from 'react';
import {connect} from 'react-redux';

import BookFilter from './BookFilter';
import Book from './Book';
import './Books.css';


class BookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {filter: {}};
  }

  onFilterUpdate = (field, val) => {
    const filter = {...this.state.filter};
    filter[field] = val;
    this.setState({filter});
  }

  render() {
    const {books} = this.props;
    const {filter} = this.state;

    const filteredBooks = books
      .filter(item => filter.avalableOnly !== true || (filter.avalableOnly && item.borrowedBy == null))
      .filter(item => !filter.title || (item.title.toLowerCase().includes(filter.title.toLowerCase())));

    return (
      <div>
        <div className='books__header'>
          <h2>Book list</h2>
          <BookFilter {...filter} onFilterUpdate={this.onFilterUpdate} />
        </div>
        <div className='books__list'>
          {filteredBooks.map(book =>
            <Book key={`${book.id}-${book.borrowedBy || ''}`} {...book} />,
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
  })).isRequired,
};


const BookListContainer = connect(
  state => ({
    books: state.book.books,
  }),
)(BookList);

export default BookListContainer;
