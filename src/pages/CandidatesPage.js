import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import CandidateList from "../components/candidate/CandidateList";
import CreateCandidateButton from "../components/candidate/CreateCandidateButton";
import AuthContext from "../store/auth-context";

export default function AllCandidates() {
    const [isLoading, setIsLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);
    const authCtx = useContext(AuthContext);

    const getCandidates = useCallback(async () => {
        setIsLoading(true);

        const url = "http://localhost:8088/api/candidate/";

        try {
            const result = await fetch(url, {
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": authCtx.token,
                },
            });

            const data = await result.json();

            if (!result.ok) {
                if (!data) {
                    alert("Issue with retriving candidates");
                    return;
                }

                // Some error in the server while retriving the candidates
                if (!data.isRetry) {
                    alert(data.message);
                    return;
                }

                const isTokenRefreshed = await authCtx.retryToken();
                if (!isTokenRefreshed) {
                    // TODO: Can add better error showing
                    setIsLoading(false);
                    setCandidates([]);
                }

                return;
            }

            const candidates = data;

            setIsLoading(false);
            setCandidates(candidates);
        } catch (err) {
            console.error("Error at CandidatesPage fetch all candidates");
            console.error(err);
        }
    }, [authCtx]);

    // FIXME: As for now there is a bug, when the token is refreshed
    // when sent to create a new candidate, it'll refresh the token
    // but all the candidateData will be lost and not resend.
    const onCreateCandidate = useCallback(
        async (candidateData) => {
            // TODO: Where is best to save the URL?
            const url = "http://localhost:8088/api/candidate/create";

            let result;
            try {
                result = await axios.post(url, candidateData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token": authCtx.token,
                    },
                });
            } catch (err) {
                let errorMsg =
                    err.response?.data?.message ??
                    "Issue with creating a candidate";
                alert(errorMsg);
                return;
            }

            if (!result) {
                alert("Issue with creating a candidate");
                return;
            }

            const data = await result.data;

            if (result.statusText !== "OK") {
                if (!data) {
                    alert("Issue with creating a candidate");
                    return;
                }

                // Some error in the server while retriving the candidates
                if (!data.isRetry) {
                    alert(data.message);
                    return;
                }

                const isTokenRefreshed = await authCtx.retryToken();
                if (!isTokenRefreshed) {
                    alert("Issue with creating a candidate");
                }

                return;
            }

            console.log("Added new candidate", {
                candidateData: candidateData,
            });
            getCandidates();

            return true;
        },
        [authCtx, getCandidates]
    );

    useEffect(() => {
        getCandidates();
    }, [getCandidates]);

    if (isLoading) {
        // TODO: Can add spinner
        return <p>Loading candidates...</p>;
    }

    return (
        <>
            {/* TODO: Should be a floating button */}
            <CreateCandidateButton onCreateCandidate={onCreateCandidate} />
            {candidates.length === 0 && (
                <p>There are not candidates yet, add a candidate</p>
            )}
            {candidates.length > 0 && (
                <CandidateList allCandidates={candidates} />
            )}
        </>
    );
}
