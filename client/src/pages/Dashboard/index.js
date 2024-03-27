import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import Chat from '../../components/Chat';
import Dialoglist from '../../components/Dialoglist';
import MessageArea from '../../components/MessageArea';
import styles from './Dashboard.module.css';
// import ChatContext from '../../contexts/ChatContext';
import {addMessage} from '../../api/index';
// import UserContext from '../../contexts/UserContext';
import { addNewMessageRequest } from '../../actions/actionCreators';


const Dashboard = (props) => {
    // const [currentChat, setCurrentChat] = useState();
    // const user = useContext(UserContext);

    const sendMessage = (text) => {
        const apiObj = {
            chatId: props.currentChat?._id,
            data: {
                author: props.user._id,
                body: text
            }
        };

        props.addNewMessageRequest(apiObj);
        // props.dispatch(addMessage(apiObj)); 


        // addMessage(apiObj)
        // .then(({data: {data}}) => {
        //     const chat = {
        //         ...currentChat,
        //         messages: [...currentChat.messages, data]
        //     };
        //     setCurrentChat(chat)
        // })
    }

    return (
        // <ChatContext.Provider value={[currentChat, setCurrentChat]} >
            <main className={styles['dashboard-container']}>
                <Dialoglist />
                <section className={styles.messenger}>
                    <Chat />
                    <MessageArea sendData={sendMessage}/>
                </section>
            </main>
        // </ChatContext.Provider>
    );
}

// export default Dashboard;

const mapStateToProps = ({user, currentChat}) => ({user, currentChat})

// const mapDispatchToProps = () => {
//     return {
//         addMessage: (data) => dispatch(addMessage(data))
//     }
// }
/////////////або
const mapDispatchToProps = {
    addNewMessageRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
