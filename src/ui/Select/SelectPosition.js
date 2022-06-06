import { message, Select, Space } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

export default function SelectPosition({ positions, setCurrPosition, title }) {
    const handleChange = (e) => {
        message.info("Click on menu item.");
        console.log("click", e);
        setCurrPosition(e === "all" ? null : e);
    };

    return (
        <Space wrap>
            <Select
                defaultValue='all'
                style={{
                    width: 200,
                }}
                onChange={handleChange}>
                <Option value='all'>{title}</Option>
                {positions.map((position) => (
                    <Option key={position.id} value={position.name}>
                        {position.name}
                    </Option>
                ))}
            </Select>
        </Space>
    );
}
