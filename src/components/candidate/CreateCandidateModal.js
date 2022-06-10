import { Input, message } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useJobCtx } from "../../store/job-context";
import RegularButton from "../../ui/button/RegularButton";
import FormInput from "../../ui/form/FormInput";
import Modal from "../../ui/modal/Modal";
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
    // const [file, setFile] = useState();
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

        // const positionId = jobCtx.jobs();
        let candidateData = new FormData();

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

    // const saveFile = (e) => {
    //     setFile(e.target.files[0]);
    // };

    const formInputStyle = { width: "200px", marginBottom: "2rem" };

    return (
        <Modal>
            <FormStyle onSubmit={createHandler}>
                <h2 style={{ color: "#6659e0" }}>Add Candidate</h2>
                <FormInput style={formInputStyle}>
                    <Input id="name" type="text" required placeholder="Name" />
                </FormInput>
                <FormInput style={formInputStyle}>
                    <Input
                        type="email"
                        id="email"
                        required
                        placeholder="Email"
                    />
                </FormInput>
                <FormInput style={formInputStyle}>
                    <Input
                        type="number"
                        id="phone"
                        required
                        placeholder="Phone"
                    />
                </FormInput>
                <FormInput style={formInputStyle}>
                    <Input
                        type="text"
                        id="currentJob"
                        required
                        placeholder="Current Job"
                    />
                </FormInput>
                <SelectPosition
                    positions={jobCtx.jobs.map((job) => {
                        return {
                            id: job._id,
                            name: job.position,
                            office: job.office,
                        };
                    })}
                    setCurrPosition={setCurrPositionId}
                    title="Select Position"
                />
                <CandidateUploadResume
                    fileList={fileList}
                    setFileList={setFileList}
                    style={{ marginTop: "2rem", ...formInputStyle }}
                ></CandidateUploadResume>
                {/* <FormInput style={{ marginTop: "2rem", ...formInputStyle }}>
                    <Input
                        type="file"
                        id="resume"
                        onChange={saveFile}
                        placeholder="Resume"
                    />
                </FormInput> */}
                <div>
                    <RegularButton
                        type="button"
                        onClick={cancelHandler}
                        style={{ marginRight: "3rem" }}
                    >
                        Cancel
                    </RegularButton>
                    {/* TODO: Add loading spinner */}
                    <RegularButton
                        type="submit"
                        disabled={isCreatingCandidate}
                        isFilled={true}
                    >
                        Create
                    </RegularButton>
                </div>
            </FormStyle>
        </Modal>
    );
}
