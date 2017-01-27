let books = [{
  title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  author: 'Robert C. Martin',
  cover: 'img/clean_code.jpg',
}, {
  title: 'Test Driven Development: By Example',
  author: 'Kent Beck',
  cover: 'img/tdd.jpg',
}, {
  title: 'You Don\'t Know JS: Up & Going',
  author: 'Kyle Simpson',
  cover: 'img/ydkjs1.jpg',
}];

exports.getBooks = () => books;
