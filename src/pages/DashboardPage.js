import { useEffect } from "react";

export default function DashboardPage() {
    useEffect(() => {
        console.log("In Dashboard");
    }, []);

    return <p>Dashboard :)</p>;
}
