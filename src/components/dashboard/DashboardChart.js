import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { useAuthCtx } from "../../store/auth-context";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CustomTooltip from "./CustomToolTip";

const url = `http://localhost:8088/api/dashboard/positions`;

export default function DashboardChart() {
    const [pieData, setPieData] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const authCtx = useAuthCtx();

    useEffect(() => {
        const getPositionsData = async () => {
            let ressponse;
            try {
                ressponse = await axios(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": authCtx.token,
                    },
                });
            } catch (err) {
                const errorMsg =
                    err.response?.data?.message ??
                    "Issue with retriving positions data for pie chart";
                message.error(errorMsg);
                return;
            }

            if (!ressponse || ressponse.statusText !== "OK") {
                message.error("Could't retrive positions data for pie chart");
                return;
            }

            setPieData(ressponse.data);
            setIsLoading(false);
        };

        setIsLoading(true);
        getPositionsData();
    }, [authCtx.token]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    let pageContent = <p>No positions and candidates data</p>;

    if (pieData.length > 0) {
        // Only show message of 'Other' category when it exist
        let isOtherCategoryExist = false;
        const pieContent = pieData.map((entry, index) => {
            if (entry.name === "Other") {
                isOtherCategoryExist = true;
            }
            return <Cell key={`cell-${index}`} fill={entry.color} />;
        });
        pageContent = (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <PieChart width={730} height={300}>
                    <Pie
                        data={pieData}
                        color='#000000'
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        outerRadius={120}
                        fill='#8884d8'>
                        {pieContent}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
                <br />
                {isOtherCategoryExist && (
                    <p style={{ color: "#6659e0" }}>
                        *Jobs with less than 1% candidates are in 'Others'
                    </p>
                )}
            </div>
        );
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#6659e0" }}>
                Candidates per Position
            </h1>
            {pageContent}
        </div>
    );
}
