import config from './config';


const apiUrl = `${config.baseUrl}api`;

const call = (method, url, body) => new Promise((resolve, reject) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) options.body = JSON.stringify(body);

  fetch(`${apiUrl}/${url}`, options).then((response) => {
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
  doUnbooking(bookId, employeeId) {
    return call('post', 'books', {bookId, employeeId, action: 'UNBOOK'});
  },
  getEmployees() {
    return call('get', 'employees');
  },
};
