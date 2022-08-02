import React, {useRef, useState} from 'react';
import "./Register.css"
import {Close, Room} from "@material-ui/icons";
import axios from "axios";

function Register(props) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            //Connecting to backend and posting new user
            const res = await axios.post("/users/register", newUser);
            setError(false)
            setSuccess(true)
        } catch (err) {
            console.log(err)
            setSuccess(false)
            setError(true)
        }
    }

    return (
        <div className="registerContainer">
            <div className="logo">
                <Room />
                Pin
            </div>
                <form onSubmit={handleSubmit} >
                    <input type="text" placeholder="username" ref={nameRef} />
                    <input type="email" placeholder="email" ref={emailRef} />
                    <input type="password" placeholder="password" ref={passwordRef} />
                    <button>Register</button>
                    {success && <span className="success">Successful! You can log in now</span>}
                    {error && <span className="failure">Something went wrong!</span>}
                </form>
            <Close className="register-close" onClick={() => props.setShowRegister(false)}/>
        </div>
    );
}

export default Register;