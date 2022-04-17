import RandomUserRepository from "../../../repository/RandomUser";


export const RANDOM_USER_SUCCESS = 'RANDOM_USER_SUCCESS'
export const RANDOM_USER_FAIL = 'RANDOM_USER_FAIL'

const getRandomUserSuccess = authData => {
    return {
        type: RANDOM_USER_SUCCESS,
        payload: authData
    }
}

const getRandomUserFail = authData => {
    return {
        type: RANDOM_USER_FAIL,
        payload: authData
    }
}


export const actionRandomUser = (params, setLoading) => async dispatch => {
    const response = await RandomUserRepository.getRandomUserList({ params: params, loading: setLoading });
    dispatch(getRandomUserSuccess(response))

};