import styled from "styled-components";
import CandidateItem from "./CandidateItem";

const ListStyle = styled.li`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export default function CandidateList({ allCandidates }) {
    return (
        <ListStyle>
            {allCandidates.map((candidate) => (
                <CandidateItem candidateData={candidate} key={candidate._id} />
            ))}
        </ListStyle>
    );
}
