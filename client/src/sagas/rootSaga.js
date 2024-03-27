import {takeLatest} from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import {getUserChatsSaga, getOneChatSaga, addNewMessageSaga} from './chatSaga';
import {getUserDataSaga, signInSaga, signUpSaga} from './authSaga';

function* rootSaga () {
    yield takeLatest(ACTION_TYPES.GET_USER_CHATS_LIST_REQUEST, getUserChatsSaga);
    yield takeLatest(ACTION_TYPES.GET_USER_DATA_REQUEST, getUserDataSaga);
    yield takeLatest(ACTION_TYPES.GET_CURRENT_CHAT_REQUEST, getOneChatSaga);
    yield takeLatest(ACTION_TYPES.ADD_NEW_MESSAGE_REQUEST, addNewMessageSaga);
    yield takeLatest(ACTION_TYPES.SIGN_IN_REQUEST, signInSaga);
    yield takeLatest(ACTION_TYPES.SIGN_UP_REQUEST, signUpSaga)

};

export default rootSaga;