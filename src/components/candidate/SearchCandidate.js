import { Input } from "antd";
import { useEffect, useState } from "react";

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
        <Input
            allowClear
            style={{ width: 200 }}
            placeholder='Search By Name'
            onChange={searchHandler}
        />
    );
}
