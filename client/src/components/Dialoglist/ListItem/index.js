import React, {useContext} from 'react';
import styles from '../Dialoglist.module.css';
import ChatContext from '../../../contexts/ChatContext';
import cx from 'classnames';

const IMAGE_PLACEHOLDER = '/assets/icons/chat-img.png';

const ListItem = (props) => {
    const [currentChat, setCurrentChat] = useContext(ChatContext);
    const {chat: {members, messages, imagePath, name, _id}} = props;
    const cnames = cx(styles['list-item'], {
        [styles['current-chat-item']] : currentChat?._id === _id
    });
    
    const clickHandler = () => {
        setCurrentChat(props.chat)
    }

    return (
        <article className={cnames} onClick={clickHandler}>
            <img src={imagePath ? imagePath : IMAGE_PLACEHOLDER}/>
            <h3>{name}</h3>
        </article>
    );
}

export default ListItem;
