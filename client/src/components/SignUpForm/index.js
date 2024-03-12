import React from 'react';
import { useFormik } from 'formik';
import {format} from 'date-fns';

import CustomField from '../CustomField';
import styles from '../../pages/Home/Home.module.css';

const SignUpForm = (props) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthday: format(new Date(), 'yyyy-MM-dd'),
            imagePath: ''
        },
        onSubmit: values => {
            console.log(values)
        }
    })
    return (
        <form 
        onSubmit={formik.handleSubmit} 
        onReset={formik.handleReset}
        className={styles.form}>
            <CustomField type='text' name='firstName' formik={formik} placeholder='Type your first name'/>
            <CustomField type='text' name='lastName' formik={formik} placeholder='Type your last name'/>
            <CustomField type='email' name='email' formik={formik} />
            <CustomField type='password' name='password' formik={formik} />
            <CustomField type='date' name='birthday' formik={formik} />
            <CustomField type='file' name='imagePath' formik={formik} />
            <button type='submit'>Submit form</button>
        </form>
    );
}

export default SignUpForm ;
