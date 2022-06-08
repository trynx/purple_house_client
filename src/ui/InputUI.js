import styled from "styled-components";

const InputStyle = styled.div`
    margin-bottom: 3rem;
    width: 15rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

    &:hover {
        color: #848dea;
    }
`;
export default function InputUI({ children }) {
    return <InputStyle>{children}</InputStyle>;
}
