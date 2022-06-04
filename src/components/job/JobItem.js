import { useState } from "react";

export default function JobItem({ jobData }) {
    const { position, department, office, candidates, daysOpen } = jobData;

    const handleClick = (event) => {
        // TODO: Download resume
        console.log("Download resume");
    };

    return (
        <li className="card">
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                }}
            >
                <h4> Position:</h4>
                <p>{position}</p>
                <h4> Department:</h4>
                <p>{department}</p>
                <h4> Office:</h4>
                <p>{office}</p>
                <h4> Candidates:</h4>
                <p>{candidates}</p>
                <h4> DaysOpen:</h4>
                <p>{daysOpen}</p>
            </div>
            <div className="actions">
                <button className="btn" onClick={handleClick}>
                    Push Me
                </button>
            </div>
        </li>
    );
}