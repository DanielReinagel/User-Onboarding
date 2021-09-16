import { useState, useEffect } from 'react';
import schema from '../schemas/FormSchema';
import * as yup from 'yup';
import axios from 'axios';

const initialFormData = {
    name: '',
    email: '',
    password: '',
    toS: false
};
const initialFormErrors = {
    name: 'A name is required',
    email: 'An email is required',
    password: 'A password is required',
    toS: 'You must agree to the Terms of Service'
}

export default function Form(props){
    const [ formData, setFormData ] = useState(initialFormData);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled] = useState(true);

    function onChange(event){
        const { type, name, checked, value } = event.target;
        const data = type==='checkbox' ? checked : value.trim();
        yup.reach(schema, name)
            .validate(data)
            .then(()=> setFormErrors({ ...formErrors, [name]: '' }))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
        setFormData({ ...formData, [name]:data });
    }

    function onSubmit(event){
        event.preventDefault();
        axios.post('https://reqres.in/api/users', formData)
            .then(res => {props.setUsers([ res.data, ...props.users]); setFormData(initialFormData); setFormErrors(initialFormErrors);})
            .catch(err => console.error(err));
    }

    useEffect(()=>schema.isValid(formData).then(valid => setDisabled(!valid)), [formData]);

    return (
        <form onSubmit={onSubmit}>
            <label>Name: <input type='text' name='name' onChange={onChange} value={formData.name}/></label>
            <br/>
            <label>Email: <input type='email' name='email' onChange={onChange} value={formData.email}/></label>
            <br/>
            <label>Password: <input type='password' name='password' onChange={onChange} value={formData.password}/></label>
            <br/>
            <label>I agree to the Terms of Service:<input type='checkbox' name='toS' onChange={onChange} checked={formData.toS}/></label>
            <br/>
            <label><input type='submit' disabled={disabled}/></label>
            <div className='errors'>
                <p style={{'color':'red'}}>{formErrors.name}</p>
                <p style={{'color':'red'}}>{formErrors.email}</p>
                <p style={{'color':'red'}}>{formErrors.password}</p>
                <p style={{'color':'red'}}>{formErrors.toS}</p>
            </div>
        </form>
    );
};