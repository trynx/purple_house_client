import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const switchAuthFormHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const form = event.target;

        const user = {
            email: form["email"].value,
            password: form["password"].value,
        };

        // TODO: Can add validation of the parameters

        // TODO: Save the url on a global place (redux?)
        const url = "http://localhost:8088";

        setIsloading(true);

        if (isLogin) {
            // TODO: Change to axios
            fetch(`${url}/api/auth/signin`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                setIsloading(false);

                if (!res.ok) {
                    return res.json().then((data) => {
                        // TODO: Can add better error visual
                        let errorMsg = data?.message
                            ? data.message
                            : "Issue with register";

                        // FIXME: Small bug that can still see 'Loading..' because the alert stop the React update loop
                        alert(errorMsg);
                    });
                }

                // TODO: On success change to 'Jobs' page and save token + refresh token
                return res.json().then((data) => {
                    const { accessToken, refreshToken } = data;
                    authCtx.login(accessToken, refreshToken);

                    // TODO: Maybe save all the routers in a the context
                    // manager, to avoid typos and use intellisense
                    history.replace("/jobs");
                });
            });
        } else {
            fetch(`${url}/api/auth/register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                setIsloading(false);

                if (!res.ok) {
                    res.json().then((data) => {
                        // TODO: Can add better error visual
                        let errorMsg = data?.message
                            ? data.message
                            : "Issue with register";

                        // FIXME: Small bug that can still see 'Loading..' because the alert stop the React update loop
                        alert(errorMsg);
                    });
                    return;
                }

                // TODO: On success say that it worked and change to the login page
                setIsLogin(true);
            });
        }
    };
    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        required
                        autoComplete='username'
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        required
                        autoComplete='current-password'
                        minLength='8'
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button type='submit'>
                            {isLogin ? "Login" : "Create Account"}
                        </button>
                    )}
                    {/* TODO: Basic showing loading, can add spinner */}
                    {isLoading && <p>Loading...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthFormHandler}>
                        {isLogin
                            ? "Create New Account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
}
