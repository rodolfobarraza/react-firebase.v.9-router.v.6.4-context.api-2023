import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

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
        <>
            <h1>Registro de nuevo usuario</h1>
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
                    <button type="submit" disabled={isSubmitting}>Register</button>
                </form>
            )}</Formik>
        </>
    )
};

export default Register;
