import React, {useState} from 'react';
import styles from './Message.module.css';

const MessageArea = (props) => {
    const [text, setText] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        props.sendData(text);
        setText('');
    };

    const changeHandler = (({target: {value}}) => {
        setText(value);
    })
    return (
        <form className={styles['message-box']} onSubmit={submitHandler}>
            <textarea className={styles.text} value={text} onChange={changeHandler}/>
            <button type="submit" className={styles.button}><img src='assets/icons/avion.png' className={styles.icon}/></button>
        </form>
    );
}

export default MessageArea;
