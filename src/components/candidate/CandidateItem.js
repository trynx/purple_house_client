import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

export default function CandidateItem({ candidateData }) {
    const { name, currentJob, position, resumeKey } = candidateData;
    const authCtx = useContext(AuthContext);

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

            const isTokenRefreshed = await authCtx.retryToken();
            if (!isTokenRefreshed) {
                alert("Issue with downloading the resume a candidate");
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

    // TODO: useEffect for the search by candidate name, after x ms
    /* 
    useEffect(() => {
        // Debounce
        const timerId = setTimeout(500, setCandaitaeName());

        return () => {
            clearTimeout(timerId);
        }
    })
     */
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
