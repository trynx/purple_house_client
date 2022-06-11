import { useState } from "react";
import CreateButton from "../../ui/button/CreateButton";
import Backdrop from "../../ui/modal/Backdrop";
import CreateCandidateModal from "./CreateCandidateModal";

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
            <CreateButton onClick={handleClick}>+</CreateButton>
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
