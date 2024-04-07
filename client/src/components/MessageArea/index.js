import React, {useState} from 'react';
import {connect} from 'react-redux';
import styles from './Message.module.css';
import {addNewMessageRequest} from '../../actions/actionCreators';

const MessageArea = (props) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState();

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
    return (
        <form className={styles['message-box']} onSubmit={submitHandler}>
            <textarea className={styles.text} value={text} onChange={changeHandler}/>
            <article className={styles['buttons-wraper']}>
                <button type="submit" className={styles.button}><img src='assets/icons/avion.png' className={styles.icon}/></button>
                <div className={styles['input-file-wrapper']}>
                    <input type="file" name="image" onChange={imageHandler} files={image} className={styles['input-file']}/>
                    <img className={styles['input-file-icon']} src='assets/icons/clip.png' />
                </div>
            </article>

            
            
        </form>
    );
}

const mapStateToProps = ({currentChat, user}) => ({currentChat, user});
const mapDispatchToProps = {
    addNewMessageRequest
}
export default connect (mapStateToProps, mapDispatchToProps)(MessageArea);
