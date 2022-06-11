import { Input } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SearchInput = styled(Input)`
    border-color: #c8cdd0;
    border-width: 2px;
    width: 200px;
    margin: 0 40px 20px 0;
    border-radius: 4px;
`;

export default function SearchCandidate({ filterCandidates }) {
    const [searchValue, setSearchValue] = useState("");

    // Debounce the search input
    useEffect(() => {
        const timerId = setTimeout(() => {
            filterCandidates(searchValue.toLowerCase());
        }, 200);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchValue, filterCandidates]);

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <SearchInput
            allowClear
            placeholder="Search By Name"
            onChange={searchHandler}
        />
    );
}
