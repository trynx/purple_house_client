import { SyncOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuthCtx } from "../../store/auth-context";
import RegularButton from "../../ui/button/RegularButton";

const FormControl = styled.div`
    // display: flex;
    // align-items: center;
    // height: 100vh;

    margin: 3rem auto;
    width: 95%;
    max-width: 25rem;
    border-radius: 6px;
    /* background-color: #77002e; */
    /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2); */
    /* padding: 1rem; */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: #6659e0;
    }
`;

const FormInput = styled.div`
    margin-bottom: 3rem;
    width: 15rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

    &:hover {
        color: #848dea;
    }
`;

const FormActions = styled.div`
    margin-top: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

    .toggle {
        cursor: pointer;
        margin-top: 2rem;
        background-color: transparent;
        color: #6659e0;
        border: none;
        padding: 0.15rem 1.5rem;
        text-decoration: underline;
    }

    .toggle:hover {
        background-color: transparent;
        color: #2a37c0;
    }
`;

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const history = useHistory();
    const authCtx = useAuthCtx();

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
                        let errorMsg = data?.message
                            ? data.message
                            : "Issue with register";

                        message.error(errorMsg);
                    });
                    return;
                }

                setIsLogin(true);
            });
        }
    };

    return (
        <FormControl>
            {/* <h1>{isLogin ? "Login" : "Register"}</h1> */}
            <form onSubmit={submitHandler}>
                <FormInput>
                    <Input
                        id='email'
                        type='email'
                        required
                        autoComplete='username'
                        placeholder='Email'
                    />
                </FormInput>
                <FormInput>
                    <Input
                        id='password'
                        type='password'
                        required
                        autoComplete='current-password'
                        minLength='8'
                        placeholder='Password'
                    />
                </FormInput>
                <FormActions>
                    <RegularButton type='submit'>
                        {!isLoading && (isLogin ? "Login" : "Create Account")}
                        {isLoading && <SyncOutlined spin />}
                    </RegularButton>
                    <button
                        type='button'
                        className='toggle'
                        onClick={switchAuthFormHandler}>
                        {isLogin
                            ? "Not register? Click here"
                            : "Login with existing account"}
                    </button>
                </FormActions>
            </form>
        </FormControl>
    );
}
