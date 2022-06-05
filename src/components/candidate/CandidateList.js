import CandidateItem from "./CandidateItem";
import classes from "./CandidateList.module.css";

export default function CandidateList({ allCandidates }) {
    return (
        <ul className={classes.list}>
            {allCandidates.map((candidate) => (
                <CandidateItem candidateData={candidate} key={candidate._id} />
            ))}
        </ul>
    );
}
