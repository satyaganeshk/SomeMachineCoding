import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../helpers/userList";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = () => {
        try {
            const user = validateUser(username, password);
            // so here we don't have any api so will store the role in the local storage and will use it to check if the user is logged in or not and will use it to show the dashboard or not
            localStorage.setItem("currentRole", user.role[0]); // Store the user's selected role separately from their details.
            // also we can switch the role to admin and check if the dashboard is showing or not and 
            // we have dummy account with username: "satya" and password: "admin" and we can use it to login as admin and check if the dashboard is showing or not we will store the user details in the local storage and will use it to show the dashboard or not
            localStorage.setItem("userDetails", JSON.stringify(user)); // Store user details in local storage
            navigate("/dashboard", { replace: true });
        } catch {
            alert("Invalid username or password");
        }
    };
    return (
        <div>       
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
