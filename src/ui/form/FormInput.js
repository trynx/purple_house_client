import styled from "styled-components";

const InputStyle = styled.div`
    margin-bottom: 3rem;
    width: 15rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

    &:hover {
        color: #2a37c0;
    }
`;

export default function FormInput({ children, style }) {
    return <InputStyle style={style}>{children}</InputStyle>;
}
