import Job from "./Job";

export default function ShowJobList() {
    const jobData = {
        position: "FrontEnd",
    };

    return (
        <>
            <h1>Jobs</h1>
            <Job jobData={jobData} />
        </>
    );
}
