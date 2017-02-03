import {BOOK_SELECTED, BOOKS_LOADED} from '../actions/book';


const DEFAULT_STATE = {
  books: [],
  filteredBooks: [],
  selectedBookId: null,
  filter: {
    title: null,
    avalableOnly: false,
  },
};

export default (state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case BOOK_SELECTED:
      return {
        ...state,
        selectedBookId: payload,
      };
    case BOOKS_LOADED:
      return {
        ...state,
        books: payload || [],
      };
    default:
      return state;
  }
};
