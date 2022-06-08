import styled from "styled-components";

const RegularButton = styled.button`
    // width: 0rem;
    font: inherit;
    padding: 0.3rem 0.7rem;
    border: 2.5px solid rgba(102, 89, 224, 0.5);
    border-radius: 4px;
    color: #6659e0;
    background: #ffffff98;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);

    &:focus {
        outline: none;
    }

    &:hover,
    &:active {
        cursor: pointer;
        background: #ffffffe3;
        color: #2a37c0;
        /* border-color: rgb(102, 89, 224); */
        box-shadow: 0 0 8px #2a37c0ad;
    }
`;

export default RegularButton;
