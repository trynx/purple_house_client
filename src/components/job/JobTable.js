import { Table } from "antd";

const columns = [
    {
        title: "Position",
        dataIndex: "position",
        key: "position",
        //   render: (text) => <a>{text}</a>,
    },
    {
        title: "Department",
        dataIndex: "department",
        key: "department",
    },
    {
        title: "Office",
        dataIndex: "office",
        key: "office",
    },
    {
        title: "Candidates",
        dataIndex: "candidates",
        key: "candidates",
    },
    {
        title: "Days Open",
        dataIndex: "daysOpen",
        key: "daysOpen",
    },
];

const daysDifference = (startDate, endDate) => {
    const diffSeconds = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffSeconds / (1000 * 3600 * 24));

    return diffDays;
};

const calcDaysOpen = (dateOpen) => {
    const openDay = new Date(dateOpen);
    const currDay = new Date();

    return daysDifference(openDay, currDay);
};

export default function JobTable({ allJobs }) {
    const jobs = allJobs.map((job) => ({
        key: job._id,
        position: job.position,
        department: job.department,
        office: job.office,
        candidates: job.candidates.length,
        daysOpen: calcDaysOpen(job.date_open),
    }));

    return (
        // pagination={{ position: ['bottomCenter'] }}
        <Table
            columns={columns}
            dataSource={jobs}
            pagination={{ position: ["bottomCenter"] }}
            scroll={{ y: "40vh" }}
            bordered={true}
        />
    );
}
