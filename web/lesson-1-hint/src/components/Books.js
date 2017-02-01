import React from 'react';

import classNames from 'classnames';
import './Books.css';


const Book = ({isBorrowed, cover, title, author}) =>
  <div className={classNames('book', isBorrowed && 'book--borrowed')}>
    <div className='book__cover'>
      <img src={process.env.PUBLIC_URL + cover} alt={title} />
    </div>
    <div className='book__title'>{title}</div>
    <div className='book__author'>{author}</div>
  </div>;

Book.propTypes = {
  isBorrowed: React.PropTypes.bool.isRequired,
  cover: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
};

const BookList = ({books}) =>
  <div>
    <h2 className='books__header'>Book list</h2>
    <div className='books__list'>
      {books.map(book =>
        <Book key={book.id} {...book} isBorrowed={book.borrowedBy != null} />,
      )}
    </div>
  </div>;

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
