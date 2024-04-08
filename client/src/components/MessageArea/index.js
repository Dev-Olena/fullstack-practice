import React, {useState} from 'react';
import {connect} from 'react-redux';
import styles from './Message.module.css';
import {addNewMessageRequest} from '../../actions/actionCreators';
import cx from 'classnames';

const MessageArea = (props) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState();
    const [drag, setDrag] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        // props.sendData(text);

        if(text || image) {
            const newMessageObject = {
                chatId: props.currentChat?._id,
                message: {
                    author: props.user._id,
                    body: text,
                    image: image
                }
            };
            props.addNewMessageRequest(newMessageObject);
    
            setText('');
        }
        
    };

    const changeHandler = (({target: {value}}) => {
        setText(value);
    });
    const imageHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const dragEnter = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDrag(true)
    };
    const dragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const dragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDrag(false);
    };

    const drop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('drop');
        setImage(event.dataTransfer.files[0]);
        setDrag(false);
    };

    const cnames = cx(styles['message-box'], {
        [styles['drag-active']]: drag
    })
    const viewDrag = () => 'Drop picture to send it'

    const viewForm = () => (
        <>
            <textarea className={styles.text} value={text} onChange={changeHandler}/>
            <article className={styles['buttons-wraper']}>
                <button type="submit" className={styles.button}><img src='assets/icons/avion.png' className={styles.icon}/></button>
                <div className={styles['input-file-wrapper']}>
                    <input type="file" name="image" onChange={imageHandler} files={image} className={styles['input-file']}/>
                    <img className={styles['input-file-icon']} src='assets/icons/clip.png' />
                </div>
            </article>
        </>
    )
    return (
        <form 
        // className={styles['message-box']} 
        onSubmit={submitHandler}
        onDragEnter={dragEnter}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={drop}
        className={cnames}>
            
        {drag ? viewDrag()  : viewForm()}
            
            
        </form>
    );
}

const mapStateToProps = ({currentChat, user}) => ({currentChat, user});
const mapDispatchToProps = {
    addNewMessageRequest
}
export default connect (mapStateToProps, mapDispatchToProps)(MessageArea);

/*
TODO-in-future: доопрацювати компоненту, створивши мініатюру файлу для перед-перегляду до відправки.
Варіанти реалізації:
1. Ще один стейт, в якому буде зберігатись зчитаний файл, що встановлюється в якості src для картинки
2. ПЕреробити drag-n-drop флоу на окрему компоненту, яка працюватиме за паттерном render-props
*/

