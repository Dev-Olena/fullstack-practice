import React, {useEffect, useState} from 'react';
import SignInForm from '../../components/SignInForm';
import SignUpForm  from '../../components/SignUpForm';
import styles from './Home.module.css';


const Home = () => {
    const [formView, setView] = useState(true);
 

    const changeView = () => {
        setView(!formView);
    };


   

    const btnText = formView ? 'Sign Up' : 'Sign In';

    return (
        <main className={styles['form-container']}>
            <button onClick={changeView}>{btnText}</button>
            {formView ? 
            <SignInForm /> 
            : <SignUpForm />}
        </main>
        
    );
}

export default Home;
