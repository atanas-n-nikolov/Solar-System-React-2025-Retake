import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useLogin } from "../../../api/authAPI";

import style from './Login.module.css';
import ErrorNotification from "../../error/ErrorNotification";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!email.trim() || !password.trim()) {
            return setError("All fields are required.");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters long.");
        }

        try {
            setIsPending(true);
            const authData = await login(email, password);
            userLoginHandler(authData);
            navigate("/");
        } catch (err) {
            setError(err.message || 'Invalid email or password.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className={style.container}>
            <section className={style.loginContainer}>
                <form className={style.loginForm} onSubmit={handleSubmit}>
                    {error && <ErrorNotification message={error} />}
                    {successMessage && <div className={style.successMessage}>{successMessage}</div>}
                    <h2>Login</h2>
                    <div className={style.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
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
