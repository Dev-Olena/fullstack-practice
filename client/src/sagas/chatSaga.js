import {put} from 'redux-saga/effects';
import {getUserChats, getOneChat, addMessage} from '../api/index';
import {getUserChatsListSuccess, 
        getUserChatsListError, 
        getCurrentChatError, 
        getCurrentChatSuccess, 
        addNewMessageSuccess, 
        addNewMessageError} from '../actions/actionCreators';

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
}