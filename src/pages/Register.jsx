import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {

    const { user } = useUserContext();

    useRedirectActiveUser(user, '/dashboard');

    const onSubmit = async ({email, password}, {setSubmitting, setErrors, resetForm}) => {
        try {
            await register({email, password});
            resetForm()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrors({email: 'Email actualmente en uso'})
            }
        } finally {
            setSubmitting(false);
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email no válido').required('Email requerido'),
        password: Yup.string().trim().min(6, 'mínimo 6 caracteres').required('Contraseña requerida'),
    })

    return (
        <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
            <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
                <AddAPhoto />
            </Avatar>
            <Typography
                variant="h5"
                component="h1"
            >
                Registro de nuevo usuario
            </Typography>
            <Formik 
                initialValues={{ email: '', password: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >{({
                handleSubmit,
                handleChange,
                values,
                isSubmitting,
                errors,
                touched,
                handleBlur,
            }) => (
                <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>

                    <TextField
                        type="text" 
                        placeholder="usuario@servidor.com" 
                        value={values.email} 
                        onChange={handleChange}
                        name='email'
                        onBlur={handleBlur}
                        id='email'
                        label="Ingresar email"
                        fullWidth
                        sx={{ mb:3 }}
                        error={errors.email && touched.email}
                        helperText={errors.email && touched.email && errors.email}
                    />
                    <TextField
                        type="password" 
                        placeholder="Ingrese contraseña" 
                        value={values.password} 
                        onChange={handleChange}
                        name='password'
                        onBlur={handleBlur}
                        id='password'
                        label='Ingresar contraseña'
                        fullWidth
                        sx={{ mb:3 }}
                        error={errors.password && touched.password}
                        helperText={errors.password && touched.password && errors.password}
                    />
                    <LoadingButton
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        variant="contained"
                        fullWidth
                        sx={{ mb: 3 }}
                    >
                        Regístrate
                    </LoadingButton>
                    <Button
                        fullWidth
                        component={Link}
                        to="/"
                    >
                        ¿Ya tienes cuenta?, Ingresa
                    </Button>
                </Box>
            )}</Formik>
        </Box>
    )
};

export default Register;
