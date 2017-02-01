import config from './config';


const apiUrl = `${config.baseUrl}api`;

const call = (method, url, body) => new Promise((resolve, reject) => {
  const options = {method};
  if (body != null) {
    const data = new FormData();
    data.append('json', JSON.stringify(body));
    options.body = data;
  }
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
