import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllCandidates from "./pages/AllCandidates";
import AllJobs from "./pages/AllJobs";
import Login from "./pages/Login";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/jobs'>
                    <AllJobs />
                </Route>
                <Route path='/candidates'>
                    <AllCandidates />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
