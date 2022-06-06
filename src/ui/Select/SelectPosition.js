import { Select, Space } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";

const { Option } = Select;

export default function SelectPosition({ positions, setCurrPosition, title }) {
    const handleChange = (e) => {
        // message.info("Click on menu item.");
        setCurrPosition(e === "all" ? null : e);
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
