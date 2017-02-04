import api from '../api';


export const START_EMPLOYEES_LOADING = 'START_EMPLOYEES_LOADING';
export const EMPLOYEES_LOADED = 'EMPLOYEES_LOADED';


export const startEmployeesLoading = () => ({
  type: START_EMPLOYEES_LOADING,
});

export const endEmployeesLoading = employees => ({
  type: EMPLOYEES_LOADED,
  payload: employees || [],
});

export const loadEmployees = () => dispatch => new Promise((resolve, reject) => {
  dispatch(startEmployeesLoading());
  api.getEmployees()
    .then((data) => {
      dispatch(endEmployeesLoading(data));
      resolve();
    })
    .catch(reject);
});
