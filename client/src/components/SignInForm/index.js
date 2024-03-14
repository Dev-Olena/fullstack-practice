import React from 'react';
import {useFormik} from 'formik';
import CustomField from '../CustomField';
import styles from '../../pages/Home/Home.module.css';
import {signIn} from '../../api/index';

const SignInForm = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            signIn(values)
            .then(res => {
                props.sendCallback(res)
            })
            
        }
    })
    return (
        <form 
        onSubmit={formik.handleSubmit} 
        onReset={formik.handleReset}
        className={styles.form}
        > 
        {/* <input  type='text'
        name='email'
        placeholder='Type your email'
        onChange={formik.handleChange}
        value={formik.values.email}
        /> */}
        <CustomField type='text' name='email' formik={formik} placeholder='Type your email'/>
        <CustomField type='text' name='password' formik={formik} placeholder='Type your password'/>
        {/* <input type='text'
        name='password'
        onChange={formik.handleChange}
        value={formik.values.password}
        /> */}
        <button type='submit'>Submit form</button>

        </form>
    );
}

export default SignInForm ;
