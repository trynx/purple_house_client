import { useState } from "react";
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
        <div>
            <button className='btn' onClick={handleClick}>
                +
            </button>
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
