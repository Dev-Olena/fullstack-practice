import React, {useContext, useEffect, useState} from 'react';
import styles from './Chat.module.css';
import ChatContext from '../../contexts/ChatContext';
import {getOneChat} from '../../api/index';

const Chat = (props) => {
    const [currentChat] = useContext(ChatContext);
    const [chatStory, setChatStory] = useState();
    useEffect (() => {
        if (currentChat) {
            getOneChat(currentChat._id)
            .then(res => {
                setChatStory(res.data.data.messages);
            })
        }
    }, [currentChat]);
    return (
        <div className={styles.chat}>
            Chat
        </div>
    );
}

export default Chat;
