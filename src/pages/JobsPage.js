import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateJobButton from "../components/job/CreateJobButton";
import JobList from "../components/job/JobList";
import AuthContext from "../store/auth-context";

export default function AllJobs() {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const onCreateJob = async (jobData) => {
        // TODO: Send to server the create
        // TODO: Add axios instead of fetch?
        // TODO: Where is best to save the URL?
        const url = "localhost:8088/api/job/create";

        // TODO: How to save the token and retrive here?
        const { result, error } = await fetch(url, {
            method: "POST",
            body: JSON.stringify(jobData),
            headers: {
                "Content-type": "application/json",
                "x-access-token": authCtx.token,
            },
        });

        const data = await result.json();

        if (!result.ok) {
        }
        // Can do history.push to save and be able to do 'back'
        // or just history.replace to not save it
        // history.push("/");

        console.log("Send new job", { jobData });
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    };

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

    const getJobs = useCallback(async () => {
        setIsLoading(true);

        // TODO: Change as needed to the backend url
        const url = "http://localhost:8088/api/job/";

        const result = await fetch(url, {
            headers: {
                "Content-type": "application/json",
                "x-access-token": authCtx.token,
            },
        });

        const data = await result.json();

        if (!result.ok) {
            if (!data) {
                alert("Issue with retriving jobs");
                return;
            }

            // Some error in the server while retriving the jobs
            if (!data.isRetry) {
                alert(data.message);
                return;
            }

            const isTokenRefreshed = await retryToken();
            if (!isTokenRefreshed) {
                // TODO: Can add better error showing
                setIsLoading(false);
                setJobs([]);
                return;
            }

            return;
        }

        const jobs = data;

        setIsLoading(false);
        setJobs(jobs);
    }, [authCtx.token, retryToken]);

    useEffect(() => {
        getJobs();
    }, [getJobs]);

    if (isLoading) {
        // TODO: Can add spinner
        return <p>Loading jobs...</p>;
    }

    return (
        <>
            <JobList allJobs={jobs} />
            {/* Should be a floating button */}
            <CreateJobButton onCreateJob={onCreateJob} />
        </>
    );
}
