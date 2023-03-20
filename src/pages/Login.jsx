import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const {user} = useUserContext()

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user])

    const onSubmit = async ({email, password}) => {
        try {
            const credentialUser = await login({email, password}) // completamente válido > await login(email: email, password: password)
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email no válido').required('Email requerido'),
        password: Yup.string().trim().min(6, 'mínimo 6 caracteres').required('Contraseña requerida'),
    });

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({values, handleSubmit, handleChange, errors, touched, handleBlur}) => (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Ingrese email" 
                                value={values.email} 
                                onChange={handleChange}
                                name='email'
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && errors.email}
                            <input 
                                type="password" 
                                placeholder="Ingrese contraseña" 
                                value={values.password} 
                                onChange={handleChange}
                                name='password'
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password && errors.password}
                            <button type="submit">Login</button>
                        </form>
                    )}
            </Formik>
        </>
    )
};

export default Login;
