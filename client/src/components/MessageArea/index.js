import React from 'react';
import styles from './Message.module.css';

const MessageArea = () => {
    return (
        <form className={styles['message-box']}>
            <textarea className={styles.text}/>
            <button className={styles.button}><img src='assets/icons/avion.png' className={styles.icon}/></button>
        </form>
    );
}

export default MessageArea;
