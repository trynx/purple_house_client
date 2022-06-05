import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import CandidatesPage from "./pages/CandidatesPage";
import JobsPage from "./pages/JobsPage";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <AuthPage />
                </Route>
                <Route path='/jobs'>
                    <JobsPage />
                </Route>
                <Route path='/candidates'>
                    <CandidatesPage />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
