import { useEffect } from "react";
import DashboardChart from "../components/dashboard/DashboardChart";
import { useNavCtx } from "../store/nav-context";
import Page from "../ui/page/Page";

export default function DashboardPage() {
    const navCtx = useNavCtx();

    useEffect(() => {
        navCtx.updateRouter("/dashboard");
    }, [navCtx]);

    return (
        <Page>
            <DashboardChart />
        </Page>
    );
}
