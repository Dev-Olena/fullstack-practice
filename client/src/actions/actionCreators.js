import ACTION_TYPES from "./actionTypes";

export const addNewMessage = (payload) => ({
    type: ACTION_TYPES.ADD_NEW_MESSAGE,
    payload
});

export const getUserChatsList = () => ({
    type: ACTION_TYPES.GET_USER_CHATS_LIST_REQUEST
});