import {BOOK_SELECTED} from '../actions/book';


const DEFAULT_STATE = {
  books: [],
  selectedBookId: null,
};

export default (state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case BOOK_SELECTED:
      return {
        ...state,
        selectedBookId: payload,
      };
    default:
      return state;
  }
};
