import { message } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CandidateList from "../components/candidate/CandidateList";
import SearchCandidate from "../components/candidate/SearchCandidate";
import SharedCreateButton from "../components/shared/SharedCreateButton";
import { useAuthCtx } from "../store/auth-context";
import { useJobCtx } from "../store/job-context";
import { useNavCtx } from "../store/nav-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import Page from "../ui/page/Page";
import SelectPosition from "../ui/select/SelectPosition";

const ListStyle = styled.div`
    // TODO: Improve responsiveness
    height: 50vh;
    overflow-y: auto;
    margin-bottom: 3px;
`;

export default function CandidatesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);
    const [candidateSearch, setCandidateSearch] = useState("");
    const [debugFile, setDebugFile] = useState();
    const authCtx = useAuthCtx();
    const jobCtx = useJobCtx();
    const navCtx = useNavCtx();

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

            if (window.debug) {
                setDebugFile(candidateData.get("file"));
            }

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
                message.error(errorMsg);
                return;
            }

            if (!result) {
                message.error("Issue with creating a candidate");
                return;
            }

            const data = await result.data;

            if (result.statusText !== "OK") {
                if (!data) {
                    message.error("Issue with creating a candidate");
                    return;
                }

                // Some error in the server while retriving the candidates
                if (!data.isRetry) {
                    message.error(data.message);
                    return;
                }

                const isTokenRefreshed = await authCtx.retryToken();
                if (!isTokenRefreshed) {
                    message.error("Issue with creating a candidate");
                }

                return;
            }

            getCandidates();

            return true;
        },
        [authCtx, getCandidates]
    );

    useEffect(() => {
        // For testing filling a lot of jobs
        if (window.debug) {
            window.debug.createCandidates = async (numCandidates) => {
                if (!debugFile) {
                    console.error(
                        "Please add a candidate to use their resume file to create other candidates."
                    );
                    return;
                }

                Array(numCandidates)
                    .fill(0)
                    .forEach(() => {
                        const randomExtra = crypto.randomUUID();

                        const candidateData = new FormData();

                        // Get each form value by it's id
                        candidateData.append("name", randomExtra);
                        candidateData.append(
                            "email",
                            randomExtra + "@gmail.com"
                        );
                        candidateData.append("phone", "123123");
                        candidateData.append("currentJob", "Groot");
                        candidateData.append(
                            "position",
                            "62a4c988736486580a2680b5"
                        );
                        candidateData.append("file", debugFile);

                        onCreateCandidate(candidateData);
                    });
            };
        }
    }, [debugFile, onCreateCandidate]);

    useEffect(() => {
        getCandidates();
    }, [getCandidates]);

    useEffect(() => {
        navCtx.updateRouter("/candidates");
    }, [navCtx]);

    if (isLoading) {
        return <LoadingSpinner />;
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
        <Page>
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
            <SharedCreateButton
                onCreate={onCreateCandidate}
                modalType={"candidate"}
            />
        </Page>
    );
}
