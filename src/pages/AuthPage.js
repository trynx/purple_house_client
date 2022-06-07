import styled from "styled-components";
import AuthForm from "../components/auth/AuthForm";

const AuthFormStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export default function AuthPage() {
    return (
        <AuthFormStyle>
            <AuthForm />
        </AuthFormStyle>
    );
}
