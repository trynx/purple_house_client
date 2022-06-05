import { useState } from "react";
import Modal from "../../ui/modal/Modal";
import classes from "./CreateJobModal.module.css";

export default function CreateJobModal({ onClose, onCreateJob }) {
    const [isCreatingJob, setIsCreatingJob] = useState(false);

    const createHandler = async (e) => {
        e.preventDefault();

        const form = e.target;

        // Get each form value by it's id
        const jobData = {
            position: form["position"].value,
            department: form["department"].value,
            office: form["office"].value,
        };

        setIsCreatingJob(true);
        await onCreateJob(jobData);

        onClose();
    };

    const cancelHandler = () => {
        onClose();
    };

    return (
        <Modal>
            <form className={classes.form} onSubmit={createHandler}>
                <h2>Create Job</h2>
                <div className={classes.control}>
                    <label htmlFor='position'>Position</label>
                    <input
                        type='text'
                        id='position'
                        required
                        placeholder='Position'></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='department'>Department</label>
                    <input
                        type='text'
                        id='department'
                        required
                        placeholder='Department'></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='office'>Office</label>
                    <input
                        type='text'
                        id='office'
                        required
                        placeholder='Office'></input>
                </div>
                {/* TODO: Upload file - Have guide in lecture 475 - Resourcers*/}
                {/* <div className={classes.control}>
                    <label htmlFor="resume">Resume - Uploadfile</label>
                    <input
                        type="text"
                        id="resume"
                        required
                        placeholder="Upload file"
                    ></input>
                </div> */}
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
                        className={`btn ${isCreatingJob ? "btn--disable" : ""}`}
                        disabled={isCreatingJob}>
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    );
}
