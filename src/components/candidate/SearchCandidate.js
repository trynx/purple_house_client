import { Input } from "antd";
import { useEffect, useState } from "react";

export default function SearchCandidate({ filterCandidates }) {
    const [searchValue, setSearchValue] = useState("");

    const selectStyle = {
        borderColor: "#c8cdd0",
        borderWidth: "2px",
        width: "200px",
        margin: "0 40px 20px 0",
        borderRadius: "4px",
    };

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
            style={selectStyle}
            placeholder='Search By Name'
            onChange={searchHandler}
        />
    );
}
