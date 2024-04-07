import React from 'react';
import Chat from '../../components/Chat';
import Dialoglist from '../../components/Dialoglist';
import MessageArea from '../../components/MessageArea';
import styles from './Dashboard.module.css';



const Dashboard = (props) => {
   

    return (
            <main className={styles['dashboard-container']}>
                <Dialoglist />
                <section className={styles.messenger}>
                    <Chat />
                    <MessageArea />
                </section>
            </main>
    );
}

export default Dashboard;


