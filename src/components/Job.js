export default function Job({ jobData }) {
    const { position } = jobData;

    const handleClick = (event) => {
        console.log("Push me was clicked", position);
    };

    return (
        <div className='card'>
            <h3>{position}</h3>
            <div className='actions'>
                <button className='btn' onClick={handleClick}>
                    Push Me
                </button>
            </div>
        </div>
    );
}
