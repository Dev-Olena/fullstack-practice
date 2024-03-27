import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './Dialoglist.module.css';
// import {getUserChats} from '../../api/index';
import ListItem from './ListItem';
import {getUserChatsList} from '../../actions/actionCreators';


const Dialoglist = (props) => {
    // const [list, setList] = useState();

    // useEffect(() => {
    //     getUserChats()
    //     .then(res => {
    //         setList(res.data.data)

    //     })
    // }, [])

    useEffect(props.getUserChatsList(), []);

    const {chatList} = props;

    return (
        <section className={styles.dialoglist}>
            <header className={styles.header}>Chat List</header>
            {chatList && chatList.map(chat => <ListItem chat={chat} key={chat._id}/>)}
        </section>
    );
}


const mapStateToProps = ({chatList}) => ({chatList});
const mapDispatchToProps = {
    getUserChatsList
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialoglist);
