import { useState } from "react";
import Backdrop from "./Backdrop";
import CreateJobModal from "./CreateJobModal";

export default function CreateJobButton() {
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
            {modalIsOpen && <CreateJobModal onClose={closeModalHandler} />}
            {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
        </div>
    );
}
