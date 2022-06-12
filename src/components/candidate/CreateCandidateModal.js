import { SyncOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useJobCtx } from "../../store/job-context";
import RegularButton from "../../ui/button/RegularButton";
import ModalFormInput from "../../ui/form/ModalFormInput";
import Modal from "../../ui/modal/Modal";
import ModalTitle from "../../ui/modal/ModalTitle";
import SelectPosition from "../../ui/select/SelectPosition";
import CandidateUploadResume from "./CandidateUploadResume";

const FormStyle = styled.form`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function CreateCandidateModal({ onClose, onCreateCandidate }) {
    const [isCreatingCandidate, setIsCreatingCandidate] = useState(false);
    const [currPositionId, setCurrPositionId] = useState();
    const [fileList, setFileList] = useState([]);

    const jobCtx = useJobCtx();

    const createHandler = async (e) => {
        e.preventDefault();

        const form = e.target;

        if (!currPositionId) {
            message.error("Please select a position");
            return;
        }

        if (fileList.length === 0) {
            message.error("Please upload a resume");
            return;
        }

        const candidateData = new FormData();

        // Get each form value by it's id
        candidateData.append("name", form["name"].value);
        candidateData.append("email", form["email"].value);
        candidateData.append("phone", form["phone"].value);
        candidateData.append("currentJob", form["currentJob"].value);
        candidateData.append("position", currPositionId);
        candidateData.append("file", fileList[0].originFileObj);

        setIsCreatingCandidate(true);
        const isSuccess = await onCreateCandidate(candidateData);

        if (isSuccess) {
            // After done creating the candidate, refresh the jobs list
            jobCtx.getJobs();
            onClose();
            return;
        }

        setIsCreatingCandidate(false);
    };

    const cancelHandler = () => {
        onClose();
    };

    return (
        <Modal>
            <FormStyle onSubmit={createHandler}>
                <ModalTitle>Add Candidate</ModalTitle>
                <ModalFormInput>
                    <Input id='name' type='text' required placeholder='Name' />
                </ModalFormInput>
                <ModalFormInput>
                    <Input
                        type='email'
                        id='email'
                        required
                        placeholder='Email'
                    />
                </ModalFormInput>
                <ModalFormInput>
                    <Input
                        type='number'
                        id='phone'
                        required
                        placeholder='Phone'
                    />
                </ModalFormInput>
                <ModalFormInput>
                    <Input
                        type='text'
                        id='currentJob'
                        required
                        placeholder='Current Job'
                    />
                </ModalFormInput>
                <SelectPosition
                    positions={jobCtx.jobs.map((job) => {
                        return {
                            id: job._id,
                            name: job.position,
                            office: job.office,
                        };
                    })}
                    setCurrPosition={setCurrPositionId}
                    title='Select Position'
                />
                <CandidateUploadResume
                    fileList={fileList}
                    setFileList={setFileList}
                    style={{
                        marginTop: "2rem",
                        width: "200px",
                        marginBottom: "2rem",
                    }}></CandidateUploadResume>
                <div>
                    <RegularButton
                        type='button'
                        onClick={cancelHandler}
                        style={{ marginRight: "3rem" }}>
                        Cancel
                    </RegularButton>
                    <RegularButton
                        type='submit'
                        disabled={isCreatingCandidate}
                        isFilled={true}>
                        {!isCreatingCandidate && "Create"}
                        {isCreatingCandidate && <SyncOutlined spin />}
                    </RegularButton>
                </div>
            </FormStyle>
        </Modal>
    );
}
