import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required('A name is required')
        .min(3, 'The name must include at least 3 characters'),
    email: yup
        .string()
        .required('An email is required')
        .email('A valid email address is required'),
    password: yup
        .string()
        .required('A password is required')
        .min(3, 'The Password must include at least 3 characters'),
    toS: yup.boolean().oneOf([true], 'You must agree to the Terms of Service')
});

export default formSchema;