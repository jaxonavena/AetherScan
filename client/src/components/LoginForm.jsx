import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDeafult();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Username form section */}
            <div>
                <label>
                    Username:
                    <input
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                        />
                </label>
            </div>
            {/* Password form section */}
            <div>
                <label>
                    Password:
                    <input
                        type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        />
                </label>
            </div>
            {/* Submit button section */}
            <div>
                <button type="submit">
                    Login
                </button>
            </div>
        </form>
    )
}

export default LoginForm;