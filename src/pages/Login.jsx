import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";

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

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={onSubmit}
            >
                {({values, handleSubmit, handleChange}) => (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Ingrese email" 
                                value={values.email} 
                                onChange={handleChange}
                                name='email'
                            />
                            <input 
                                type="password" 
                                placeholder="Ingrese contraseña" 
                                value={values.password} 
                                onChange={handleChange}
                                name='password'
                            />
                            <button type="submit">Login</button>
                        </form>
                    )}
            </Formik>
        </>
    )
};

export default Login;
