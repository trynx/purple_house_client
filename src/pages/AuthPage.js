import { useEffect } from "react";
import styled from "styled-components";
import AuthForm from "../components/auth/AuthForm";

const AuthFormStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: auto;
    width: 95%;
    max-width: 25rem;
    border-radius: 6px;
    text-align: center;
    flex-direction: column;
`;

export default function AuthPage() {
    useEffect(() => {
        console.log("In Auth");
    }, []);

    return (
        <AuthFormStyle>
            <AuthForm />
        </AuthFormStyle>
    );
}
