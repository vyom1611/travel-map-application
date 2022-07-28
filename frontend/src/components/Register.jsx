import React from 'react';
import "./Register.css"

function Register(props) {
    return (
        <div className="registerContainer">
            <div className="logo">
                <form>
                    <input type="text" placeholder="username"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;