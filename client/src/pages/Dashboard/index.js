import React, {useState} from 'react';
import Chat from '../../components/Chat';
import Dialoglist from '../../components/Dialoglist';
import MessageArea from '../../components/MessageArea';
import styles from './Dashboard.module.css';
import ChatContext from '../../contexts/ChatContext';


const Dashboard = (props) => {
    const [currentChat, setCurrentChat] = useState();

    return (
        <ChatContext.Provider value={[currentChat, setCurrentChat]} >
            <main className={styles['dashboard-container']}>
                <Dialoglist />
                <section className={styles.messenger}>
                    <Chat />
                    <MessageArea />
                </section>
            </main>
        </ChatContext.Provider>
    );
}

export default Dashboard;
