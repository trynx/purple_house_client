import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuthCtx } from "./auth-context";

const JobContext = React.createContext({
    isLoading: false,
    jobs: [],
    positions: [],
    currPosition: null,
    onCreateJob: (jobData) => {},
    getJobs: () => {},
    setCurrPosition: () => {},
});

export const JobContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    // TODO: jobs, positions and currPosition can be a reducer?
    const [jobs, setJobs] = useState([]);
    const [positions, setPositions] = useState([]);
    const [currPositionId, setCurrPositionId] = useState(null);
    const [currPosition, setCurrPosition] = useState(null);
    const authCtx = useAuthCtx();

    const getJobsHandler = useCallback(async () => {
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
    const onCreateJobHandler = useCallback(
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

            getJobsHandler();
        },
        [authCtx, getJobsHandler]
    );

    useEffect(() => {
        getJobsHandler();
    }, [getJobsHandler]);

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

    useEffect(() => {
        setCurrPosition(
            jobs.find((job) => job._id === currPositionId)?.position
        );
    }, [currPositionId, jobs]);

    const contextValue = {
        isLoading,
        jobs,
        positions,
        currPosition,
        onCreateJob: onCreateJobHandler,
        getJobs: getJobsHandler,
        setCurrPosition: setCurrPositionId,
    };

    return (
        <JobContext.Provider value={contextValue}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobCtx = () => {
    const context = useContext(JobContext);

    if (context === undefined) {
        throw new Error("useJobCtx must be used within a JobContextProvider ");
    }

    return context;
};
