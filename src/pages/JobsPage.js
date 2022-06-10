import CreateJobButton from "../components/job/CreateJobButton";
import JobList from "../components/job/JobList";
import { useJobCtx } from "../store/job-context";
import SelectPosition from "../ui/select/SelectPosition";

export default function AllJobs() {
    const jobCtx = useJobCtx();

    if (jobCtx.isLoading) {
        // TODO: Can add spinner
        return <p>Loading jobs...</p>;
    }

    return (
        <>
            <SelectPosition
                positions={jobCtx.positions}
                setCurrPosition={jobCtx.setCurrPosition}
                title="Filter By Job"
            />

            {jobCtx.jobs.length === 0 && (
                <p>There are not jobs yet, add a job</p>
            )}
            {jobCtx.jobs.length > 0 && (
                <JobList
                    allJobs={
                        jobCtx.currPosition
                            ? jobCtx.jobs.filter(
                                  (job) => job.position === jobCtx.currPosition
                              )
                            : jobCtx.jobs
                    }
                />
            )}
            {/* TODO: Should be a floating button */}
            <CreateJobButton onCreateJob={jobCtx.onCreateJob} />
        </>
    );
}
