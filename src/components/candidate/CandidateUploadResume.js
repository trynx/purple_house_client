import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React from "react";

export default function CandidateUploadResume({
    style,
    fileList,
    setFileList,
}) {
    const beforeUpload = (file) => {
        const supportedFileTypes = ["application/pdf", "application/word"];

        if (!supportedFileTypes.some((type) => type === file.type)) {
            message.error(`${file.name} is not a pdf or word file`);
            return Upload.LIST_IGNORE;
        }

        // Add to list but don't upload
        return false;
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <div style={style}>
            <Upload
                onChange={onChange}
                fileList={fileList}
                beforeUpload={beforeUpload}
                maxCount={1}
            >
                <Button icon={<UploadOutlined />}>Upload Resume</Button>
            </Upload>
        </div>
    );
}
