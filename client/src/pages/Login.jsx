import React, { useState} from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const HandleLogin = (event) => {
        event.preventDefault(); // prevent page refresh when submitting form

        // Login logic
        if (username && password) {
            alert(`Logged in as ${username}`);
        }
    };

    return (
        <div class="login">
            <h2>Login Form</h2>
            <LoginForm />
        </div>
    );
};

export default Login;