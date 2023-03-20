import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Typography } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";

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

    const onSubmit = async ({email, password}, {setSubmitting, setErrors, resetForm}) => {
        try {
            const credentialUser = await login({email, password}) // completamente válido > await login(email: email, password: password)
            resetForm();
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/user-not-found') {
                return setErrors({email: 'Usuario no registrado'});
            }
            if (error.code === 'auth/wrong-password') {
                return setErrors({password: 'Contraseña inválida'});
            }
        } finally {
            setSubmitting(false)

        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email no válido').required('Email requerido'),
        password: Yup.string().trim().min(6, 'mínimo 6 caracteres').required('Contraseña requerida'),
    });

    return (
        <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
            <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
                <AddAPhoto></AddAPhoto>
            </Avatar>
            <Typography variant="h5" component="h1">Login</Typography>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    values, 
                    handleSubmit, 
                    handleChange, 
                    errors, 
                    touched, 
                    handleBlur, 
                    isSubmitting
                }) => (
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
                            <button type="submit" disabled={isSubmitting}>Login</button>
                        </form>
                    )}
            </Formik>
        </Box>
    )
};

export default Login;
