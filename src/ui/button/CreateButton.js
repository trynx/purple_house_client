import styled from "styled-components";

const ButtonStyle = styled.button`
    cursor: pointer;
    font-size: 2em;
    padding: 0.45rem 1.4rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: rgba(102, 89, 224, 0.5);
    color: white;
    border: 2px solid #6659e0;

    &:hover {
        background-color: #2a37c0;
        border-color: #2a37c0;
    }
`;

export default ButtonStyle;
