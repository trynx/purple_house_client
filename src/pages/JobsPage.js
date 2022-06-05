import { useCallback, useContext, useEffect, useState } from "react";
import CreateJobButton from "../components/job/CreateJobButton";
import JobList from "../components/job/JobList";
import AuthContext from "../store/auth-context";

export default function AllJobs() {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
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

    const getJobs = useCallback(async () => {
        setIsLoading(true);

        // TODO: Change as needed to the backend url
        const url = "http://localhost:8088/api/job/";

        try {
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
                }

                return;
            }

            const jobs = data;

            setIsLoading(false);
            setJobs(jobs);
        } catch (err) {
            console.error("Error at JobPage fetch all jobs");
            console.error(err);
        }
    }, [authCtx.token, retryToken]);

    // FIXME: As for now there is a bug, when the token is refreshed
    // when sent to create a new job, it'll refresh the token
    // but all the jobData will be lost and not resend.
    const onCreateJob = useCallback(
        async (jobData) => {
            // TODO: Add axios instead of fetch?
            // TODO: Where is best to save the URL?
            const url = "http://localhost:8088/api/job/create";

            // TODO: How to save the token and retrive here?
            const result = await fetch(url, {
                method: "POST",
                body: JSON.stringify(jobData),
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": authCtx.token,
                },
            });

            const data = await result.json();

            if (!result.ok) {
                if (!data) {
                    alert("Issue with creating a job");
                    return;
                }

                // Some error in the server while retriving the jobs
                if (!data.isRetry) {
                    alert(data.message);
                    return;
                }

                const isTokenRefreshed = await retryToken();
                if (!isTokenRefreshed) {
                    alert("Issue with creating jobs");
                }

                return;
            }

            // Can do history.push to save and be able to do 'back'
            // or just history.replace to not save it

            console.log("Added new job", { jobData });
            getJobs();
        },
        [authCtx.token, retryToken, getJobs]
    );

    useEffect(() => {
        getJobs();
    }, [getJobs]);

    if (isLoading) {
        // TODO: Can add spinner
        return <p>Loading jobs...</p>;
    }

    return (
        <>
            {jobs.length === 0 && <p>There are not jobs yet, add a job</p>}
            {jobs.length > 0 && <JobList allJobs={jobs} />}
            {/* TODO: Should be a floating button */}
            <CreateJobButton onCreateJob={onCreateJob} />
        </>
    );
}
