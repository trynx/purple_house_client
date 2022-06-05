export default function CandidateItem({ candidateData }) {
    const { name, currentJob, position } = candidateData;

    const handleClick = (event) => {
        // TODO: Download resume
        console.log("Download resume");
    };

    return (
        <li className='card'>
            {/* TODO: Data profile component */}
            <div>
                <p>Name: {name}</p>
                <p>Current Job: {currentJob}</p>
            </div>
            <div>
                <p>Candidate position: {position.position}</p>
            </div>
            {/* TODO */}
            <div className='actions'>
                <button className='btn' onClick={handleClick}>
                    Download resume
                </button>
            </div>
        </li>
    );
}
