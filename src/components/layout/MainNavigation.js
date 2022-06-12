import { Tabs } from "antd";
import { useHistory } from "react-router-dom";
import { useAuthCtx } from "../../store/auth-context";
import { useNavCtx } from "../../store/nav-context";
import RegularButton from "../../ui/button/RegularButton";
const { TabPane } = Tabs;

export default function MainNavigation() {
    const navCtx = useNavCtx();
    const authCtx = useAuthCtx();
    const history = useHistory();

    if (!authCtx.isLoggedIn) {
        return <></>;
    }

    const changeHandler = (router) => {
        navCtx.updateRouter(router);
        history.replace(router);
    };

    return (
        <Tabs
            defaultActiveKey={navCtx.router}
            activeKey={navCtx.router}
            tabBarStyle={{ color: "#6659e0" }}
            style={{
                paddingTop: "1rem",
                marginRight: "1rem",
                marginLeft: "1.3rem",
            }}
            tabBarExtraContent={
                <RegularButton onClick={authCtx.logout}>Log Out</RegularButton>
            }
            onChange={changeHandler}>
            <TabPane tab='Candidates' key='/candidates' />
            <TabPane tab='Jobs' key='/jobs' />
            <TabPane tab='Dashboard' key='/dashboard' />
        </Tabs>
    );
}
