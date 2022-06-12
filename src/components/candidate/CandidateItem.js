import { Divider, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import { useAuthCtx } from "../../store/auth-context";
import CandidatePosition from "./CandidatePosition";
import CandidateProfile from "./CandidateProfile";
import CandidateResume from "./CandidateResume";

const CardStyle = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 4px;
    border-width: 2px;
    border-color: #c8cdd0;
    border-style: solid;
    padding: 0.4rem 1rem;
    margin: 0 0 1rem;
`;

const dividerStyle = {
    height: "3.5rem",
    borderLeft: "2.5px solid rgba(0, 0, 0, 0.25)",
};

export default function CandidateItem({ candidateData }) {
    const { name, currentJob, position, resumeKey } = candidateData;
    const authCtx = useAuthCtx();

    const handleClick = async (event) => {
        // TODO: Where is best to save the URL?
        const url = "http://localhost:8088/api/candidate/resume";

        let result;
        try {
            result = await axios.post(
                url,
                { resumeKey },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": authCtx.token,
                    },
                    responseType: "blob",
                }
            );
        } catch (err) {
            let errorMsg =
                err.response?.data?.message ??
                "Issue with downloading the resume a candidate";
            message.error(errorMsg);
            return;
        }

        if (!result) {
            message.error("Couldn't download the resume");
            return;
        }

        let data = result.data;

        if (result.statusText !== "OK") {
            if (!data) {
                message.error("Issue with downloading the resume a candidate");
                return;
            }

            // Some error in the server while retriving the candidates
            if (!data.isRetry) {
                message.error(data.message);
                return;
            }

            const isTokenRefreshed = await authCtx.retryToken();
            if (!isTokenRefreshed) {
                message.error("Issue with downloading the resume a candidate");
            }

            // Refresh token
            return;
        }

        const resumeUrl = window.URL.createObjectURL(new Blob([data]));
        const resumeNameArr = resumeKey.split("/");
        const resumeName = resumeNameArr[resumeNameArr.length - 1];
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.setAttribute("download", resumeName);
        document.body.appendChild(link);
        link.click();
    };

    if (!position) {
        return null;
    }

    return (
        <CardStyle>
            <CandidateProfile name={name} currentJob={currentJob} />
            <Divider type="vertical" style={dividerStyle} />
            <CandidatePosition>{position.position}</CandidatePosition>
            <Divider type="vertical" style={dividerStyle} />
            <CandidateResume handleClick={handleClick} />
        </CardStyle>
    );
}
