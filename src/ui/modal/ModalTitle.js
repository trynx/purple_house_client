import styled from "styled-components";
const TitleStyle = styled.h2`
    color: #6659e0;
`;

export default function ModalTitle({ children }) {
    return <TitleStyle>{children}</TitleStyle>;
}
