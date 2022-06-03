import { useState } from "react";
import Backdrop from "./Backdrop";
import CreateJobModal from "./CreateJobModal";

export default function Job({ jobData }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { position } = jobData;

    const handleClick = (event) => {
        setModalIsOpen(true);
    };

    const closeModalHandler = () => {
        setModalIsOpen(false);
    };

    return (
        <div className='card'>
            <h3>{position}</h3>
            <div className='actions'>
                <button className='btn' onClick={handleClick}>
                    Push Me
                </button>
            </div>
            {modalIsOpen && <CreateJobModal onClose={closeModalHandler} />}
            {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
        </div>
    );
}
