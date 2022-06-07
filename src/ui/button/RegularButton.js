import styled from "styled-components";

// .button {
//     font: inherit;
//     padding: 0.5rem 1.5rem;
//     cursor: pointer;
//     border-radius: 4px;
//     background-color: #c5156d;
//     color: white;
//     border: 1px solid #c5156d;
//     margin: 0 1rem;
// }

// .button:hover {
//     background-color: #9c1458;
//     border-color: #9c1458;
// }
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

// export default function RegularButton({ title, onClick }) {
//     return <button onClick={onClick}>{title}</button>;
// }

export default RegularButton;
