import React, {useContext} from 'react';
import {connect} from 'react-redux';
// import UserContext from '../../../contexts/UserContext';
import styles from '../Chat.module.css';
import cx from 'classnames';

const ChatItem = (props) => {
    // const user = useContext(UserContext);
    const {author, body} = props.data;
    

    const cnames = cx(styles['message-container'], {
        [styles['current-user-message']]: author._id === props.user?._id
    })
    return (
        <div className={cnames}>
            <p className={styles['message-author']}>
                {author.firstName} 
                {author.lastName}
            </p>
            <p>
                {body}
            </p>
        </div>
    );
}

const mapState = ({user}) => ({user});

export default connect(mapState)(ChatItem);
