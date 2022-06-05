import axios from "axios";
import { useCallback, useContext } from "react";
import AuthContext from "../../store/auth-context";

export default function CandidateItem({ candidateData }) {
    const { name, currentJob, position, resumeKey } = candidateData;
    const authCtx = useContext(AuthContext);

    // TODO: Research how to do it globally and that don't need to manually add it for each request
    const retryToken = useCallback(async () => {
        const result = await fetch(
            `http://localhost:8088/api/auth/refreshtoken`,
            {
                method: "POST",
                body: JSON.stringify({ refreshToken: authCtx.refreshToken }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await result.json();

        if (!result.ok) {
            console.error(data);
            authCtx.logout();
            return false;
        }

        console.log("Refresh token");
        const { accessToken, refreshToken } = data;
        authCtx.login(accessToken, refreshToken);
        return true;
    }, [authCtx]);

    const handleClick = async (event) => {
        // TODO: Download resume
        console.log("Download resume");

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
            alert(errorMsg);
            return;
        }

        if (!result) {
            alert("Couldn't download the resume");
            return;
        }

        let data = result.data;

        if (result.statusText !== "OK") {
            if (!data) {
                alert("Issue with downloading the resume a candidate");
                return;
            }

            // Some error in the server while retriving the candidates
            if (!data.isRetry) {
                alert(data.message);
                return;
            }

            const isTokenRefreshed = await retryToken();
            if (!isTokenRefreshed) {
                alert("Issue with downloading the resume a candidate");
            }

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

    return (
        <li className='card'>
            {/* TODO: Data profile component */}
            <div>
                <p>Name: {name}</p>
                <p>Current Job: {currentJob}</p>
            </div>
            <div>
                <p>Candidate position: {position.position}</p>
            </div>
            {/* TODO */}
            <div className='actions'>
                <button className='btn' onClick={handleClick}>
                    Download resume
                </button>
            </div>
        </li>
    );
}
