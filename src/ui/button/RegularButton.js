import styled from "styled-components";

const RegularButton = styled.button`
    // width: 0rem;
    font: inherit;
    padding: 0.3rem 0.7rem;
    border: 2.5px solid rgba(102, 89, 224, 0.5);
    border-radius: 4px;
    background: ${(props) => (props.isFilled ? "#6659e0" : "#ffffff98")};
    color: ${(props) => (props.isFilled ? "white" : "#6659e0")};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);

    &:focus {
        outline: none;
    }

    &:hover,
    &:active {
        cursor: pointer;
        background: ${(props) => (props.isFilled ? "#4130d9" : "#ffffffe3")};
        color: ${(props) => (props.isFilled ? "white" : "#2a37c0")};
        box-shadow: ${(props) =>
            "0 0 8px " + (props.isFilled ? "#4130d9" : "#2a37c0ad")};
    }
`;

export default RegularButton;
