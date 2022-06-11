import { Spin } from "antd";
import styled from "styled-components";

const LoadingStyle = styled.div`
    margin: 20px 0;
    margin-bottom: 20px;
    padding: 30px 50px;
    text-align: center;
    border-radius: 4px;
`;

export default function LoadingSpinner() {
    return (
        <LoadingStyle>
            <Spin tip="Loading..." size="large" style={{ color: "#6659e0" }} />
        </LoadingStyle>
    );
}
