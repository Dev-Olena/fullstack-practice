import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createChatRequest} from '../../actions/actionCreators';
import styles from './ModalWindow.module.css';


const ModalWindow = (props) => {
    const [newChat, setNewChat] = useState('');

    const changeHandler = ({target: {value}}) => {
        setNewChat(value)
    };
    const closeModal = () => {
        props.close(false)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.createChatRequest({
            name: newChat
        });
        closeModal();

    }

    return (
        <section className={styles['back-wrapper']}>
            <article className={styles['modal-window']}>
                <form onSubmit={submitHandler}>
                    <h3 className={styles['form-title']}>Create new Chat</h3>
                    <span onClick={closeModal} className={styles['close-icon']}>X</span>
                    <input type='text' name='name' value={newChat} onChange={changeHandler}/>
                    <button type='submit'>Submit</button>
                </form>
            </article>
            
        </section>
    );
}
const mapDispath = {
    createChatRequest
}
export default connect(null, mapDispath) (ModalWindow);

/*
ModalWindow має містити форму для створення нового чату. Кнопку відправки, яка відправляє action, той через сагу відправляє запит на api
*/
