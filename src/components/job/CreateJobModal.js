import { SyncOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useJobCtx } from "../../store/job-context";
import RegularButton from "../../ui/button/RegularButton";
import FormInput from "../../ui/form/FormInput";
import Modal from "../../ui/modal/Modal";
import ModalTitle from "../../ui/modal/ModalTitle";

const FormStyle = styled.form`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const formInputStyle = { width: "200px", marginBottom: "2rem" };

export default function CreateJobModal({ onClose, onCreateJob }) {
    const [isCreatingJob, setIsCreatingJob] = useState(false);
    const jobCtx = useJobCtx();

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
        await jobCtx.onCreateJob(jobData);

        onClose();
    };

    const cancelHandler = () => {
        onClose();
    };

    return (
        <Modal>
            <FormStyle onSubmit={createHandler}>
                <ModalTitle>Create Job</ModalTitle>
                <FormInput style={formInputStyle}>
                    <Input
                        type="text"
                        id="position"
                        required
                        placeholder="Position"
                    />
                </FormInput>
                <FormInput style={formInputStyle}>
                    <Input
                        type="text"
                        id="department"
                        required
                        placeholder="Department"
                    />
                </FormInput>
                <FormInput style={formInputStyle}>
                    <Input
                        type="text"
                        id="office"
                        required
                        placeholder="Office"
                    />
                </FormInput>
                {/* <div className={classes.control}>
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
                </div> */}
                <div>
                    <RegularButton
                        type="button"
                        onClick={cancelHandler}
                        style={{ marginRight: "3rem" }}
                    >
                        Cancel
                    </RegularButton>
                    <RegularButton
                        type="submit"
                        disabled={isCreatingJob}
                        isFilled={true}
                    >
                        {!isCreatingJob && "Create"}
                        {isCreatingJob && <SyncOutlined spin />}
                    </RegularButton>
                </div>
            </FormStyle>
        </Modal>
    );
}
