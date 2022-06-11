import { useEffect } from "react";
import JobTable from "../components/job/JobTable";
import SharedCreateButton from "../components/shared/SharedCreateButton";
import { useJobCtx } from "../store/job-context";
import Page from "../ui/page/Page";
import SelectPosition from "../ui/select/SelectPosition";

export default function JobsPage() {
    const jobCtx = useJobCtx();

    useEffect(() => {
        console.log("In Jobs");

        // For testing filling a lot of jobs
        if (window.debug) {
            window.debug.createJobs = async (numJobs) => {
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
        }
    }, [jobCtx]);

    // TODO: Looks not so good how it's done, think about other way when have more knowledge
    useEffect(() => {
        jobCtx.getJobs();
    }, []);

    let jobs = [];

    if (!jobCtx.isLoading) {
        // Populate the jobs after there is data
        jobs = jobCtx.currPosition
            ? jobCtx.jobs.filter((job) => job.position === jobCtx.currPosition)
            : jobCtx.jobs;
    }

    return (
        <Page>
            <SelectPosition
                positions={jobCtx.positions}
                setCurrPosition={jobCtx.setCurrPosition}
                title="Filter By Job"
                styled={{ marginBottom: "1rem" }}
                isDisabled={jobCtx.isLoading}
            />

            {/* FIXME: There is a visual jump on the filled table when changing between pages */}
            <JobTable allJobs={jobs} isLoading={jobCtx.isLoading} />

            <SharedCreateButton
                onCreate={jobCtx.onCreateJob}
                modalType={"job"}
            />
        </Page>
    );
}
