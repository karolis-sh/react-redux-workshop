import {EMPLOYEES_LOADED} from '../actions/employee';


const DEFAULT_STATE = {
  employees: [],
};

export default (state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case EMPLOYEES_LOADED:
      return {
        ...state,
        employees: payload,
      };
    default:
      return state;
  }
};
