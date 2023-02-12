import { Close, Room} from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./Login.css";

export default function Login(props) {
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const res = await axios.post("/users/login", user);
            props.localStorage.setItem("user", res.data.username);
            props.setCurrentUser(res.data.username);
            setError(false);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="loginContainer">
            <div className="logo">
                <Room className="logoIcon" />
                <span>Pin</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input autoFocus placeholder="username" ref={usernameRef} />
                <input
                    type="password"
                    min="6"
                    placeholder="password"
                    ref={passwordRef}
                />
                <button className="inpButton" type="submit">
                    Login
                </button>
                {error && <span className="failure">Something went wrong!</span>}
            </form>
            <Close className="loginCancel" onClick={() => props.setShowLogin(false)} />
        </div>
    );
}
