import { RANDOM_USER_FAIL, RANDOM_USER_SUCCESS } from '../../actions/random-users';

const initialState = {
    randomUsers: null,
    randomUsersError: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case RANDOM_USER_SUCCESS:
            return {
                ...state,
                randomUsers: action.payload
            }
        case RANDOM_USER_FAIL:
            return {
                ...state,
                randomUsersError: action.payload,
            }
        default:
            return state
    }
}