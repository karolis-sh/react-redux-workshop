import React from 'react';

import './Books.css';


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

export default BookFilter;
