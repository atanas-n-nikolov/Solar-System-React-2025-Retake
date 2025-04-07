import { Link, useNavigate } from "react-router";
import style from './Register.module.css';
import { UserContext } from "../../../context/UserContext";
import { useContext, useState } from "react";
import { useRegister } from "../../../api/authAPI";
import { useNotificationContext } from "../../../context/NotificationContext";

export default function Register() {
    const { userLoginHandler } = useContext(UserContext);
    const navigate = useNavigate();
    const { register } = useRegister();
    const { showNotification } = useNotificationContext();
    const [isPending, setIsPending] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, rePassword } = formData;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !rePassword.trim()) {
            return showNotification("All fields are required.", "error");
        };

        if (firstName.length < 3) {
            return showNotification("Firstname must be at least 3 characters long.", "error");
        };

        if (lastName.length < 3) {
            return showNotification("Lastname must be at least 3 characters long.", "error");
        };

        if (email.length < 5) {
            return showNotification("Email must be at least 3 characters long.", "error");
        };
    
        if (password.length < 6) {
            return showNotification("Password must be at least 6 characters long.", "error");
        };

        if (password !== rePassword) {
            return showNotification("Password missmatch!", "error");
        };

        try {
            setIsPending(true);
            const authData = await register(firstName, lastName, email, password, rePassword);
            userLoginHandler(authData);
            navigate("/");
        } catch (err) {
            showNotification(err.message || 'Invalid registration. Please try again later.', "error");
        } finally {
            setIsPending(false);
        }
    };


    return (
        <div className={style.container}>
            <section className={style.registerContainer}>
                <form className={style.registerForm} onSubmit={handleSubmit}>
                    <h2>Registration</h2>

                    <div className={style.formFullName}>
                        <div className={style.formGroup}>
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="rePassword">Repeat password:</label>
                        <input type="password" id="rePassword" name="rePassword" value={formData.rePassword} onChange={handleChange} />
                    </div>

                    <button type="submit" disabled={isPending}>
                    {isPending ? 'Register...' : 'Register'}</button>
                    <p className={style.signupMessage}>
                        Already have an account? <Link to="/login">Click here to login</Link>
                    </p>
                </form>

                <aside className={style.registerImage}>
                    <img src="/images/register.png" alt="Register Illustration" />
                </aside>
            </section>
        </div>
    );
}
