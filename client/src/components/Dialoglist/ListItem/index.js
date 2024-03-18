import React from 'react';
import styles from '../Dialoglist.module.css';

const IMAGE_PLACEHOLDER = '/assets/icons/chat-img.png';

const ListItem = (props) => {
    const {chat: {members, messages, imagePath, name}} = props;
    return (
        <article className={styles['list-item']}>
            <img src={imagePath ? imagePath : IMAGE_PLACEHOLDER}/>
            <h3>{name}</h3>
        </article>
    );
}

export default ListItem;
