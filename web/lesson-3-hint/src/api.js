import config from './config';


const call = (method, url, body) => new Promise((resolve, reject) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) options.body = JSON.stringify(body);

  fetch(`${config.baseUrl}api/${url}`, options).then((response) => {
    response.json().then(resolve);
  }).catch(reject);
});


export default {
  getBooks() {
    return call('get', 'books');
  },
  doBooking(bookId, employeeId) {
    return call('post', 'books', {bookId, employeeId, action: 'BOOK'});
  },
  doUnbooking(bookId) {
    return call('post', 'books', {bookId, action: 'UNBOOK'});
  },
  getEmployees() {
    return call('get', 'employees');
  },
};
