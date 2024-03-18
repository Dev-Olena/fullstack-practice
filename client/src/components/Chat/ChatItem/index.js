import React, {useContext} from 'react';
import UserContext from '../../../contexts/UserContext';
import styles from '../Chat.module.css';
import cx from 'classnames';

const ChatItem = (props) => {
    const user = useContext(UserContext);
    const {author, body} = props.data;
    

    const cnames = cx(styles['message-container'], {
        [styles['current-user-message']]: author === user?._id
    })
    return (
        <div className={cnames}>
            <p className={styles['message-author']}>
                {author}
            </p>
            <p>
                {body}
            </p>
        </div>
    );
}

export default ChatItem ;
