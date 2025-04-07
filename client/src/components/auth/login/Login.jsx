import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useLogin } from "../../../api/authAPI";

import style from './Login.module.css';
import { useNotificationContext } from "../../../context/NotificationContext";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();
    const { showNotification } = useNotificationContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email.trim() || !password.trim()) {
            return showNotification("All fields are required.", "error");
        }
    
        if (password.length < 6) {
            return showNotification("Password must be at least 6 characters long.", "error");
        }
    
        try {
            setIsPending(true);
            const authData = await login(email, password);
            userLoginHandler(authData);
            navigate("/");
        } catch (err) {
            showNotification(err.message || 'Invalid email or password.', "error");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className={style.container}>
            <section className={style.loginContainer}>
                <form className={style.loginForm} onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className={style.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                    <p className={style.signupMessage}>
                        You don't have an account? <Link to="/sign-up">Click here to sign up</Link>
                    </p>
                </form>

                <aside className={style.loginImage}>
                    <img src="/images/login.png" alt="Login Illustration" />
                </aside>
            </section>
        </div>
    );
}
