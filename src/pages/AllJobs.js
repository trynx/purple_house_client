import JobList from "../components/job/JobList";
import CreateJobButton from "../components/job/CreateJobButton";
import { useHistory } from "react-router-dom";
const DUMMY_DATA = [
    {
        id: "j1",
        position: "FrontEnd",
        department: "R&D",
        office: "TelAviv",
        candidates: "2",
        daysOpen: "5",
    },
    {
        id: "j2",
        position: "BackEnd",
        department: "R&D",
        office: "TelAviv",
        candidates: "1",
        daysOpen: "2",
    },
    {
        id: "j3",
        position: "FullStack",
        department: "R&D",
        office: "TelAviv",
        candidates: "4",
        daysOpen: "15",
    },
];

export default function AllJobs() {
    const history = useHistory();

    const onCreateJob = async (jobData) => {
        // TODO: Send to server the create
        // TODO: Add axios instead of fetch?
        // TODO: Where is best to save the URL?
        const url = "localhost:8088/api/job/create";

        // TODO: How to save the token and retrive here?
        // await fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify(jobData),
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        // });

        // Can do history.push to save and be able to do 'back'
        // or just history.replace to not save it
        // history.push("/");

        console.log("Send new job", { jobData });
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    };
    return (
        <>
            <JobList allJobs={DUMMY_DATA} />
            {/* Should be a floating button */}
            <CreateJobButton onCreateJob={onCreateJob} />
        </>
    );
}
