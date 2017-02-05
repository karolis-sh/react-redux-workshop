import api from '../api';


export const BOOK_SELECTED = 'BOOK_SELECTED';
export const START_BOOKS_LOADING = 'START_BOOKS_LOADING';
export const BOOKS_LOADED = 'BOOKS_LOADED';
export const BOOKS_FILTER_UPDATED = 'BOOKS_FILTER_UPDATED';


export const startBooksLoading = () => ({
  type: START_BOOKS_LOADING,
});

export const endBooksLoading = books => ({
  type: BOOKS_LOADED,
  payload: books,
});

export const selectBook = bookId => ({
  type: BOOK_SELECTED,
  payload: bookId,
});

export const loadBooks = () => dispatch => new Promise((resolve, reject) => {
  dispatch(startBooksLoading());
  api.getBooks()
    .then((data) => {
      dispatch(endBooksLoading(data));
      resolve();
    })
    .catch(reject);
});
