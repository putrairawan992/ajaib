import { combineReducers } from 'redux';
import randomUsers from './random-users';

const reducers = combineReducers({
    randomUsers: randomUsers
});

export default reducers;