import React, { useState} from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleLogin = async (username, email, password) => {
      // event.preventDefault(); // prevent page refresh when submitting form

      const loginData = { name: username, email: email, password: password };

      try {
          const response = await fetch("http://localhost:8080/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(loginData),
          });

          const data = await response.json();

          if (response.ok) {
              alert(`Logged in as ${data.name}`);
          } else {
              alert("Invalid credentials. Please try again.");
          }
      } catch (error) {
          console.error("Error logging in:", error);
          alert("An error occurred during login.");
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