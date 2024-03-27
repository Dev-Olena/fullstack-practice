import {put} from 'redux-saga/effects';
import {getUserData} from '../api/index';
import {getUserDataSuccess, getUserDataError} from '../actions/actionCreators';


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