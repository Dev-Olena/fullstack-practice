import React, {useContext, useEffect, useState} from 'react';
import styles from './Chat.module.css';
import ChatContext from '../../contexts/ChatContext';
import {getOneChat} from '../../api/index';
import ChatItem from './ChatItem/index';

const Chat = (props) => {
    const [currentChat] = useContext(ChatContext);
    const [chatStory, setChatStory] = useState([]);

    useEffect (() => {
        if (currentChat) {
            getOneChat(currentChat._id)
            .then(res => {
                setChatStory(res.data.data.messages);

            })
        }
    }, [currentChat]);
    return (
        <section className={styles.chat}>
            {chatStory && chatStory.map(message => <ChatItem data={message} key={message._id}/>)}
        </section>
    );
}

export default Chat;
