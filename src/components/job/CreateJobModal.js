export default function CreateJobModal({ onClose }) {
    const createHandler = () => {
        onClose();
    };

    const cancelHandler = () => {
        onClose();
    };

    return (
        <div className='modal'>
            <h2>Create Job</h2>
            <input type='text' placeholder='Position'></input>

            <div>
                <button className='btn btn--alt' onClick={cancelHandler}>
                    Cancel
                </button>
                <button className='btn' onClick={createHandler}>
                    Create
                </button>
            </div>
        </div>
    );
}
