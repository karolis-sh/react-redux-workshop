import React from 'react';
import './Books.css';


const Book = ({cover, title, author}) =>
  <div className='book'>
    <div className='book-cover'>
      <img src={process.env.PUBLIC_URL + cover} alt={title} />
    </div>
    <div className='book-title'>{title}</div>
    <div className='book-author'>{author}</div>
  </div>;

Book.propTypes = {
  cover: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
};

const BookList = ({books}) =>
  <div>
    <h2 className='books-header'>Book list</h2>
    <div className='books-list'>
      {books.map(book =>
        <Book key={book.id} {...book} />,
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
