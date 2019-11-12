import { combineReducers } from 'redux';

const userData = (state: any = [], action: any) => {
  switch (action.type) {
    case 'FIRST':
      return { token: action.payload };
    default:
      return state;
  }
};

const reducers = {
  userData,
};

export const rootReducer = combineReducers(reducers);
