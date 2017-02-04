import {BOOK_SELECTED, BOOKS_LOADED} from '../actions/book';


const DEFAULT_STATE = {
  books: [],
  selectedBook: null,
};

export default (state = DEFAULT_STATE, {type, payload}) => {
  let selectedBook = null;

  switch (type) {
    case BOOK_SELECTED:
      state.books.forEach((book) => {
        if (book.id === payload) {
          selectedBook = book;
        }
      });
      return {
        ...state,
        selectedBook,
      };
    case BOOKS_LOADED:
      if (state.selectedBook) {
        payload.forEach((book) => {
          if (book.id === state.selectedBook.id) {
            selectedBook = book;
          }
        });
      }
      return {
        ...state,
        books: payload,
        selectedBook,
      };
    default:
      return state;
  }
};
