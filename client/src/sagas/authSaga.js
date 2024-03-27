import {put} from 'redux-saga/effects';
import {getUserData, signIn, signUp} from '../api/index';
import {getUserDataSuccess, 
        getUserDataError, 
        signInSuccess, 
        signInError, 
        signUpSuccess, 
        signUpError} from '../actions/actionCreators';
import history from '../history';



export function* getUserDataSaga() {
    try {
        const result = yield getUserData();
        const action = getUserDataSuccess(result.data.data);
        yield put(action);
    } catch (error) {
        const errorAction = getUserDataError(error);
        yield put(errorAction)
    }
};




export function* signUpSaga(action) {
    try {
        const {data: {data}} = yield signUp(action.payload);
        yield put(signUpSuccess(data));
        history.push('/messenger');
    } catch (error) {
        yield put(signUpError(error))
    }
};
export function* signInSaga(action) {
    try {
        const {data: {data}} = yield signIn(action.payload);
        yield put(signInSuccess(data));
        history.push('/messenger');
    } catch (error) {
        yield put(signInError(error))
    }
};