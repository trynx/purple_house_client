import UnderlineTextButton from "../../ui/button/UnderlineTextButton";

export default function CandidateResume({ handleClick }) {
    return (
        <UnderlineTextButton onClick={handleClick}>
            Download Resume
        </UnderlineTextButton>
    );
}
