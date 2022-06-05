import JobItem from "./JobItem";
import classes from "./JobList.module.css";
export default function ShowJobList({ allJobs }) {
    return (
        <ul className={classes.list}>
            {allJobs.map((job) => (
                <JobItem jobData={job} key={job._id} />
            ))}
        </ul>
    );
}
