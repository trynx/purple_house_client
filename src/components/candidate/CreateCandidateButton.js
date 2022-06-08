import { useState } from "react";
import styled from "styled-components";
import Backdrop from "../../ui/modal/Backdrop";
import CreateCandidateModal from "./CreateCandidateModal";

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
export default function CreateCandidateButton({ onCreateCandidate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleClick = (event) => {
        setModalIsOpen(true);
    };

    const closeModalHandler = () => {
        setModalIsOpen(false);
    };

    return (
        <div style={{ textAlign: "right" }}>
            <ButtonStyle onClick={handleClick}>+</ButtonStyle>
            {modalIsOpen && (
                <CreateCandidateModal
                    onClose={closeModalHandler}
                    onCreateCandidate={onCreateCandidate}
                />
            )}
            {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
        </div>
    );
}
