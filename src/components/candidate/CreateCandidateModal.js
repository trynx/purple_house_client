import { useState } from "react";
import Modal from "../../ui/modal/Modal";
import classes from "./CreateCandidateModal.module.css";

export default function CreateCandidateModal({ onClose, onCreateCandidate }) {
    const [isCreatingCandidate, setIsCreatingCandidate] = useState(false);

    const createHandler = async (e) => {
        e.preventDefault();

        const form = e.target;

        // Get each form value by it's id
        const candidateData = {
            name: form["name"].value,
            email: form["email"].value,
            phone: form["phone"].value,
            currentJob: form["currentJob"].value,
            position: form["position"].value,
        };

        setIsCreatingCandidate(true);
        await onCreateCandidate(candidateData);

        onClose();
    };

    const cancelHandler = () => {
        onClose();
    };

    return (
        <Modal>
            <form className={classes.form} onSubmit={createHandler}>
                <h2>Add Candidate</h2>
                <div className={classes.control}>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        required
                        placeholder='Name'></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        required
                        placeholder='Email'></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='number'
                        id='phone'
                        required
                        placeholder='Phone'></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='currentJob'>Current Job</label>
                    <input
                        type='text'
                        id='currentJob'
                        required
                        placeholder='Current Job'></input>
                </div>
                {/* TODO: Drop down of positions options */}
                <div className={classes.control}>
                    <label htmlFor='position'>Position Id[temp]</label>
                    <input type='text' id='position' required></input>
                </div>

                {/* TODO: Upload file */}
                <div>
                    <button
                        type='button'
                        className='btn btn--alt'
                        onClick={cancelHandler}>
                        Cancel
                    </button>
                    {/* TODO: Add loading spinner */}
                    <button
                        type='submit'
                        className={`btn ${
                            isCreatingCandidate ? "btn--disable" : ""
                        }`}
                        disabled={isCreatingCandidate}>
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    );
}
