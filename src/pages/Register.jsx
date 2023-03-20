import { useState } from "react";
import { register } from "../config/firebase";

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const credentialUser = await register({email, password})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Registro de nuevo usuario</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Ingrese email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Ingrese contraseña" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">register</button>
            </form>
        </>
    )
};

export default Register;
