import { useState } from "react";
import CreateButton from "../../ui/button/CreateButton";
import Backdrop from "../../ui/modal/Backdrop";
import CreateCandidateModal from "../candidate/CreateCandidateModal";
import CreateJobModal from "../job/CreateJobModal";

export default function SharedCreateButton({ onCreate, modalType }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleClick = (event) => {
        setModalIsOpen(true);
    };

    const closeModalHandler = () => {
        setModalIsOpen(false);
    };

    if (!modalType) {
        throw new Error(`[SharedCreateButton] Please send a modal type`);
    }
    modalType = modalType.toLowerCase();

    let modal;
    if (modalType === "job") {
        modal = (
            <CreateJobModal
                onClose={closeModalHandler}
                onCreateCandidate={onCreate}
            />
        );
    } else if (modalType === "candidate") {
        modal = (
            <CreateCandidateModal
                onClose={closeModalHandler}
                onCreateCandidate={onCreate}
            />
        );
    }

    if (!modal) {
        throw new Error(
            `[SharedCreateButton] The selected type ${modalType} doesn't exist.`
        );
    }

    return (
        <div style={{ textAlign: "right" }}>
            <CreateButton onClick={handleClick}>+</CreateButton>
            {modalIsOpen && modal}
            {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
        </div>
    );
}
