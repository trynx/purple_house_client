import classes from "./CreateJobModal.module.css";

export default function CreateJobModal({ onClose }) {
    const createHandler = (e) => {
        e.preventDefault();

        const form = e.target;

        // Get each form value by it's id
        const newJob = {
            position: form["position"].value,
            department: form["department"].value,
            office: form["office"].value,
        };

        console.log({ newJob });
        onClose();
    };

    const cancelHandler = () => {
        onClose();
    };

    return (
        <div className="modal">
            <form className={classes.form} onSubmit={createHandler}>
                <h2>Create Job</h2>
                <div className={classes.control}>
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        id="position"
                        required
                        placeholder="Position"
                    ></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor="department">Department</label>
                    <input
                        type="text"
                        id="department"
                        required
                        placeholder="Department"
                    ></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor="office">Office</label>
                    <input
                        type="text"
                        id="office"
                        required
                        placeholder="Office"
                    ></input>
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
                        type="button"
                        className="btn btn--alt"
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
