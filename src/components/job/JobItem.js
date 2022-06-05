const daysDifference = (startDate, endDate) => {
    const diffSeconds = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffSeconds / (1000 * 3600 * 24));

    return diffDays;
};

export default function JobItem({ jobData }) {
    const { position, department, office, candidates, date_open } = jobData;

    const openDay = new Date(date_open);
    const currDay = new Date();

    const daysOpen = daysDifference(openDay, currDay);

    return (
        <li className='card'>
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                }}>
                <h4> Position:</h4>
                <p>{position}</p>
                <h4> Department:</h4>
                <p>{department}</p>
                <h4> Office:</h4>
                <p>{office}</p>
                <h4> Candidates:</h4>
                <p>{candidates.length}</p>
                <h4> DaysOpen:</h4>
                <p>{daysOpen}</p>
            </div>
        </li>
    );
}
