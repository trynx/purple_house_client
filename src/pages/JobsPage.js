import { useCallback, useContext, useEffect, useState } from "react";
import CreateJobButton from "../components/job/CreateJobButton";
import JobList from "../components/job/JobList";
import AuthContext from "../store/auth-context";
import SelectPosition from "../ui/Select/SelectPosition";

export default function AllJobs() {
    const [isLoading, setIsLoading] = useState(true);
    // TODO: jobs, positions and currPosition can be a reducer?
    const [jobs, setJobs] = useState([]);
    const [positions, setPositions] = useState([]);
    const [currPosition, setCurrPosition] = useState(null);
    const authCtx = useContext(AuthContext);

    const getJobs = useCallback(async () => {
        setIsLoading(true);

        console.log("Get Jobs");

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

                const isTokenRefreshed = await authCtx.retryToken();
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
    }, [authCtx]);

    // FIXME: As for now there is a bug, when the token is refreshed
    // when sent to create a new job, it'll refresh the token
    // but all the jobData will be lost and not resend.
    const onCreateJob = useCallback(
        async (jobData) => {
            // TODO: Add axios instead of fetch?
            // TODO: Where is best to save the URL?
            const url = "http://localhost:8088/api/job/create";

            const result = await await fetch(url, {
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

                const isTokenRefreshed = await authCtx.retryToken();
                if (!isTokenRefreshed) {
                    alert("Issue with creating jobs");
                    return;
                }

                // Token refreshed
                return;
            }

            getJobs();
        },
        [authCtx, getJobs]
    );

    useEffect(() => {
        getJobs();
    }, [getJobs]);

    useEffect(() => {
        // Filter duplicate positions and save the position name and id
        // to be used for the select list
        const jobsHelper = {};
        const positionArr = [];

        jobs.forEach((job) => {
            if (!jobsHelper[job.position]) {
                jobsHelper[job.position] = true;
                positionArr.push({ name: job.position, id: job._id });
            }
        });

        setPositions(positionArr);
    }, [jobs]);

    if (isLoading) {
        // TODO: Can add spinner
        return <p>Loading jobs...</p>;
    }

    return (
        <>
            <SelectPosition
                positions={positions}
                setCurrPosition={setCurrPosition}
                title='Filter By Job'
            />

            {jobs.length === 0 && <p>There are not jobs yet, add a job</p>}
            {jobs.length > 0 && (
                <JobList
                    allJobs={
                        currPosition
                            ? jobs.filter(
                                  (job) => job.position === currPosition
                              )
                            : jobs
                    }
                />
            )}
            {/* TODO: Should be a floating button */}
            <CreateJobButton onCreateJob={onCreateJob} />
        </>
    );
}
