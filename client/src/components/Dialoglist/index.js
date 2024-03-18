import React, {useState, useEffect} from 'react';
import styles from './Dialoglist.module.css';
import {getUserChats} from '../../api/index';
import ListItem from './ListItem';


const Dialoglist = (props) => {
    const [list, setList] = useState();

    useEffect(() => {
        getUserChats()
        .then(res => {
            setList(res.data.data)

        })
    }, [])
    
    return (
        <section className={styles.dialoglist}>
            <header className={styles.header}>Chat List</header>
            {list && list.map(chat => <ListItem chat={chat} key={chat._id}/>)}
        </section>
    );
}

export default Dialoglist ;
