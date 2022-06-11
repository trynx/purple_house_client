import styled from "styled-components";

const Modal = styled.div`
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: white;
    padding: 1rem;
    text-align: center;
    width: 30rem;
    z-index: 10;
    position: fixed;
    top: 1rem;
    left: calc(50% - 15rem);
`;

export default Modal;
