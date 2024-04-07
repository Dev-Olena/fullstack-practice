import React, {useContext} from 'react';
import {connect} from 'react-redux';
// import UserContext from '../../../contexts/UserContext';
import styles from '../Chat.module.css';
import cx from 'classnames';
import CONSTANTS from '../../../constants';

const ChatItem = (props) => {
    // при такій деструктиризації за відсутності imagePathв вовідомленні він буде просто undefined
    const {message: {author, body, imagePath}} = props;
    

    const cnames = cx(styles['message-container'], {
        [styles['current-user-message']]: author._id === props.user?._id
    })
    return (
        <div className={cnames}>
            <p className={styles['message-author']}>
                {author.firstName} {author.lastName}
            </p>
            <p>
                {body}
            </p>
        {imagePath && <img className={styles['massage-image']} src={`${CONSTANTS.API_BASE}/${imagePath}`}/>}
        </div>
    );
}

const mapState = ({user}) => ({user});

export default connect(mapState)(ChatItem);
