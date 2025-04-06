import { Link } from "react-router";
import style from './Register.module.css';

export default function Register() {

    return (
        <div className={style.container}>
            <section className={style.registerContainer}>
                <form className={style.registerForm}>
                    <h2>Registration</h2>

                    <div className={style.formFullName}>
                        <div className={style.formGroup}>
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" name="firstName" required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="lastName" required />
                        </div>
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="rePassword">Repeat password:</label>
                        <input type="password" id="rePassword" name="rePassword" required />
                    </div>

                    <button type="submit">Register</button>
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
