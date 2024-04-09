import React, {useState} from 'react';
import Chat from '../../components/Chat';
import Dialoglist from '../../components/Dialoglist';
import MessageArea from '../../components/MessageArea';
import ModalWindow from '../../components/ModalWindow';
import styles from './Dashboard.module.css';



const Dashboard = (props) => {
    const [modal, setModal] = useState(false);
   

    return (
            <main className={styles['dashboard-container']}>
                <Dialoglist openModal={setModal}/>
                <section className={styles.messenger}>
                    <Chat />
                    <MessageArea />
                </section>
                {modal && <ModalWindow close={setModal}/>}
                
            </main>
    );
}

export default Dashboard;


