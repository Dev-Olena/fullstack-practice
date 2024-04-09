import {put} from 'redux-saga/effects';
import {getUserChats, getOneChat, addMessage, createChat} from '../api/index';
import {getUserChatsListSuccess, 
        getUserChatsListError, 
        getCurrentChatError, 
        getCurrentChatSuccess, 
        addNewMessageSuccess, 
        addNewMessageError,
        createChatSuccess,
        createChatError} from '../actions/actionCreators';

export function* getUserChatsSaga () {
    try {
        const result = yield getUserChats();
        const action = getUserChatsListSuccess(result.data.data);
        // відправляємо action в reducer
        yield put(action);
    } catch (error) {
        const errorAction = getUserChatsListError(error);
        yield put(errorAction)
    }
};

export function* getOneChatSaga(action) {
    try {
        console.log(action.payload)
        const {data: {data}} = yield getOneChat(action.payload);
        yield put(getCurrentChatSuccess(data))
    } catch (error) {
        const errorAction = getCurrentChatError(error);
        yield put(errorAction)
    }
};

export function* addNewMessageSaga(action) {
    try {
        console.log(action.payload);
        const {data: {data}} = yield addMessage(action.payload);
        yield put(addNewMessageSuccess(data));
    } catch (error) {
        yield put(addNewMessageError(error));
    }
};

export function* createChatSaga(action) {
    try {
        const{data: {data}} = yield createChat(action.payload);
        yield put(createChatSuccess(data));
    } catch (error) {
        yield put(createChatError(error))
    }
};