import { useState } from "react";
import Backdrop from "./Backdrop";
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
        <div>
            <button className="btn" onClick={handleClick}>
                +
            </button>
            {modalIsOpen && (
                <CreateJobModal
                    onClose={closeModalHandler}
                    onCreateJob={onCreateJob}
                />
            )}
            {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
        </div>
    );
}
