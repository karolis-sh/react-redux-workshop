export const BOOK_SELECTED = 'BOOK_SELECTED';


export const bookSelected = bookId => ({
  type: BOOK_SELECTED,
  payload: bookId,
});
