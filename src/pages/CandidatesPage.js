import { Spin } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CandidateList from "../components/candidate/CandidateList";
import CreateCandidateButton from "../components/candidate/CreateCandidateButton";
import SearchCandidate from "../components/candidate/SearchCandidate";
import { useAuthCtx } from "../store/auth-context";
import { useJobCtx } from "../store/job-context";
import SelectPosition from "../ui/select/SelectPosition";

const PageStyle = styled.div`
    margin: 1rem;
`;

const LoadingStyle = styled.div`
    margin: 20px 0;
    margin-bottom: 20px;
    padding: 30px 50px;
    text-align: center;
    border-radius: 4px;
`;

const ListStyle = styled.div`
    height: 70vh;
    overflow-y: auto;
    margin-bottom: 3px;
`;

export default function CandidatesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);
    const [candidateSearch, setCandidateSearch] = useState("");
    const authCtx = useAuthCtx();
    const jobCtx = useJobCtx();

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
                    console.error("Issue with retriving candidates");
                    return;
                }

                // Some error in the server while retriving the candidates
                if (!data.isRetry) {
                    console.error(data.message);
                    return;
                }

                const isTokenRefreshed = await authCtx.retryToken();
                if (!isTokenRefreshed) {
                    // TODO: Can add better error showing
                    setIsLoading(false);
                    setCandidates([]);
                    return;
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
        return (
            <LoadingStyle>
                <Spin
                    tip='Loading...'
                    size='large'
                    style={{ color: "#6659e0" }}
                />
            </LoadingStyle>
        );
    }

    const getVisibleCandidates = () => {
        // Have at least one option to filter
        if (!jobCtx.currPosition && !!!candidateSearch) {
            return candidates;
        }

        const candidatesVisible = candidates.filter((candidate) => {
            // The position is valid if there is no currPosition or are the same as the candidate position
            const isPositionValid = !(
                !!jobCtx.currPosition &&
                candidate.position.position !== jobCtx.currPosition
            );

            // The candidate is valid if there is no values candidateSearch or are the same as the candidate position
            const isNameValid = !(
                !!candidateSearch &&
                !candidate.name.toLowerCase().startsWith(candidateSearch)
            );

            return isPositionValid && isNameValid;
        });

        return candidatesVisible;
    };

    const visibleCandidates = getVisibleCandidates();

    return (
        <PageStyle>
            <div style={{ flex: 1 }}>
                <SearchCandidate filterCandidates={setCandidateSearch} />
                <SelectPosition
                    positions={jobCtx.positions}
                    setCurrPosition={jobCtx.setCurrPosition}
                    title='Filter By Position'
                />
            </div>
            <ListStyle>
                {candidates.length === 0 && (
                    <p>There are not candidates yet, add a candidate</p>
                )}
                {candidates.length > 0 && (
                    <CandidateList allCandidates={visibleCandidates} />
                )}
            </ListStyle>
            <CreateCandidateButton onCreateCandidate={onCreateCandidate} />
        </PageStyle>
    );
}
