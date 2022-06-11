import { useState } from "react";
import CreateButton from "../../ui/button/CreateButton";
import Backdrop from "../../ui/modal/Backdrop";
import CreateJobModal from "./CreateJobModal";

export default function CreateJobButton({ onCreateJob }) {
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
                <CreateJobModal
                    onClose={closeModalHandler}
                    onCreateCandidate={onCreateJob}
                />
            )}
            {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
        </div>
    );
}
