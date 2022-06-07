import { Select, Space } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";

const { Option } = Select;

const ALL_KEY = "all";

export default function SelectPosition({ positions, setCurrPosition, title }) {
    const [isAllPositionSelected, setIsAllPositionSelected] = useState(false);

    const handleChange = (e) => {
        setIsAllPositionSelected(e !== ALL_KEY);

        setCurrPosition(e === ALL_KEY ? null : e);
    };

    // Used to clean the current position, so it doesn't affect
    // the rest of the components which use this context.
    // TODO: I think this isn't the best approach... just good enough
    useEffect(() => {
        return () => setCurrPosition(null);
    }, [setCurrPosition]);

    return (
        <Space wrap>
            <Select
                style={{ width: 200 }}
                onChange={handleChange}
                placeholder={title}>
                {/*Only show the 'All Positions' option at the begin state
                and when the 'All Position' is selected */}
                {isAllPositionSelected && (
                    <Option key={ALL_KEY}>All Positions</Option>
                )}
                {positions.map((position) => {
                    return (
                        <Option key={position.id}>
                            {position.name}
                            {!!position.office && <br />}
                            {!!position.office && position.office}
                        </Option>
                    );
                })}
            </Select>
        </Space>
    );
}
