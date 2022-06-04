import JobList from "../components/job/JobList";
import CreateJobButton from "../components/job/CreateJobButton";

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
    // TODO: Add CreateJob
    return (
        <>
            <JobList allJobs={DUMMY_DATA} />
            {/* Should be a floating button */}
            <CreateJobButton />
        </>
    );
}
