import { Tabs } from "antd";
import { useHistory } from "react-router-dom";
import { useAuthCtx } from "../../store/auth-context";
import RegularButton from "../../ui/button/RegularButton";
import classes from "./MainNavigation.module.css";
const { TabPane } = Tabs;

export default function MainNavigation() {
    const authCtx = useAuthCtx();
    const history = useHistory();

    if (!authCtx.isLoggedIn) {
        return <></>;
    }

    const changeHandler = (router) => {
        history.replace(router);
    };

    return (
        <Tabs
            defaultActiveKey='1'
            centered
            className={classes}
            tabBarStyle={{ color: "#6659e0" }}
            style={{
                paddingTop: "2rem",
                marginRight: "1rem",
            }}
            tabBarExtraContent={
                <RegularButton onClick={authCtx.logout}>Log Out</RegularButton>
            }
            onChange={changeHandler}>
            <TabPane tab='Candidates' key='/candidates' />
            <TabPane tab='Jobs' key='jobs' />
            <TabPane tab='Dashboard' key='/dashboard' />
        </Tabs>
    );
}
