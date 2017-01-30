import config from './config';


const apiUrl = `${config.baseUrl}api`;

const call = url => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/${url}`).then((response) => {
    response.json().then(resolve);
  }).catch(reject);
});


export default {
  getBooks() {
    return call('books');
  },
  getEmployees() {
    return call('employees');
  },
};
