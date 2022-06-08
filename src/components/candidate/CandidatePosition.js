import styled from "styled-components";

const CandidatePositionStyle = styled.div`
    font: inherit;
    width: 50%;
    text-align: center;
`;

export default function CandidatePosition({ children }) {
    return <CandidatePositionStyle>{children}</CandidatePositionStyle>;
}
