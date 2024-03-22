import React, {useState, useContext} from 'react';
import Chat from '../../components/Chat';
import Dialoglist from '../../components/Dialoglist';
import MessageArea from '../../components/MessageArea';
import styles from './Dashboard.module.css';
import ChatContext from '../../contexts/ChatContext';
import {addMessage} from '../../api/index';
import UserContext from '../../contexts/UserContext';


const Dashboard = (props) => {
    const [currentChat, setCurrentChat] = useState();
    const user = useContext(UserContext);

    const sendMessage = (text) => {
        const apiObj = {
            chatId: currentChat?._id,
            data: {
                author: user._id,
                body: text
            }
        };
        addMessage(apiObj)
        .then(({data: {data}}) => {
            const chat = {
                ...currentChat,
                messages: [...currentChat.messages, data]
            };
            setCurrentChat(chat)
        })
    }

    return (
        <ChatContext.Provider value={[currentChat, setCurrentChat]} >
            <main className={styles['dashboard-container']}>
                <Dialoglist />
                <section className={styles.messenger}>
                    <Chat />
                    <MessageArea sendData={sendMessage}/>
                </section>
            </main>
        </ChatContext.Provider>
    );
}

export default Dashboard;
