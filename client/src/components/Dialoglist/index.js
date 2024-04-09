import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './Dialoglist.module.css';
// import {getUserChats} from '../../api/index';
import ListItem from './ListItem';
import {getUserChatsList} from '../../actions/actionCreators';

//при відкритті компонента робить запит на список діалогів юзера

const Dialoglist = (props) => {
    // const [list, setList] = useState();

    // useEffect(() => {
    //     getUserChats()
    //     .then(res => {
    //         setList(res.data.data)

    //     })
    // }, [])

    useEffect(() => {
        props.getUserChatsList()
    }, []);

    const {chatList} = props;

    const openModal = () => {
        props.openModal(true);
    }

    return (
        <section className={styles.dialoglist}>
            <header className={styles.header}>Chat List</header>
            {chatList && chatList.map(chat => <ListItem chat={chat} key={chat._id}/>)}
            <footer className={styles.footer} onClick={openModal}>+ Add new chat</footer>
        </section>
    );
}


const mapStateToProps = ({chatList}) => ({chatList});
const mapDispatchToProps = {
    getUserChatsList
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialoglist);
