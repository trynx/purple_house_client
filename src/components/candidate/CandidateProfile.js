import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import styled from "styled-components";

const CandidateProfileStyle = styled.div`
    display: flex;
    align-items: center;
    width: 13rem;
`;
export default function CandidateProfile({ name, currentJob }) {
    return (
        <CandidateProfileStyle>
            <Avatar icon={<UserOutlined />} style={{ marginRight: "10px" }} />
            <div>
                {name}
                <br />
                {currentJob}
            </div>
        </CandidateProfileStyle>
    );
}
