import { useState } from "react";
import Modal from "../../ui/modal/Modal";
import classes from "./CreateCandidateModal.module.css";

export default function CreateCandidateModal({ onClose, onCreateCandidate }) {
    const [isCreatingCandidate, setIsCreatingCandidate] = useState(false);
    const [file, setFile] = useState();

    const createHandler = async (e) => {
        e.preventDefault();

        const form = e.target;

        let candidateData = new FormData();

        // Get each form value by it's id
        candidateData.append("name", form["name"].value);
        candidateData.append("email", form["email"].value);
        candidateData.append("phone", form["phone"].value);
        candidateData.append("currentJob", form["currentJob"].value);
        candidateData.append("position", form["position"].value);
        candidateData.append("file", file);

        setIsCreatingCandidate(true);
        const isSuccess = await onCreateCandidate(candidateData);

        if (isSuccess) {
            onClose();
            return;
        }

        setIsCreatingCandidate(false);
    };

    const cancelHandler = () => {
        onClose();
    };

    const saveFile = (e) => {
        setFile(e.target.files[0]);
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
                <div className={classes.control}>
                    <label htmlFor='resume'>Upload Resume</label>
                    <input
                        type='file'
                        id='resume'
                        onChange={saveFile}
                        placeholder='Resume'
                    />
                </div>
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
