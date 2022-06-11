import { useEffect } from "react";
import styled from "styled-components";
import CreateJobButton from "../components/job/CreateJobButton";
import JobTable from "../components/job/JobTable";
import { useJobCtx } from "../store/job-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import SelectPosition from "../ui/select/SelectPosition";

const PageStyle = styled.div`
    padding-left: 3rem;
    padding-right: 1rem;
`;

export default function JobsPage() {
    const jobCtx = useJobCtx();

    // For testing filling a lot of jobs
    useEffect(() => {
        console.log("In Jobs");
        window.createJobs = async (numJobs) => {
            Array(numJobs)
                .fill(0)
                .forEach(() => {
                    // To avoid duplicate positions + offices
                    const randomExtra = crypto.randomUUID();
                    // Get each form value by it'  s id
                    const jobData = {
                        position: "position " + randomExtra,
                        department: "department " + randomExtra,
                        office: "office " + randomExtra,
                    };

                    jobCtx.onCreateJob(jobData);
                });
        };
    }, [jobCtx]);

    if (jobCtx.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <PageStyle>
            <SelectPosition
                positions={jobCtx.positions}
                setCurrPosition={jobCtx.setCurrPosition}
                title="Filter By Job"
                styled={{ marginBottom: "1rem" }}
            />

            {jobCtx.jobs.length === 0 && (
                <p>There are not jobs yet, add a job</p>
            )}
            {jobCtx.jobs.length > 0 && (
                <JobTable
                    allJobs={
                        jobCtx.currPosition
                            ? jobCtx.jobs.filter(
                                  (job) => job.position === jobCtx.currPosition
                              )
                            : jobCtx.jobs
                    }
                />
            )}
            <CreateJobButton onCreateJob={jobCtx.onCreateJob} />
        </PageStyle>
    );
}
