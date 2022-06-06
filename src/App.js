import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import CandidatesPage from "./pages/CandidatesPage";
import JobsPage from "./pages/JobsPage";
import { useAuthCtx } from "./store/auth-context";
import { JobContextProvider } from "./store/job-context";

function App() {
    const authCtx = useAuthCtx();

    const startPage = !authCtx.isLoggedIn && <Redirect to='/' />;

    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    {!authCtx.isLoggedIn && <AuthPage />}
                    {authCtx.isLoggedIn && <Redirect to='/jobs' />}
                </Route>
                <JobContextProvider>
                    <Route path='/jobs'>
                        {authCtx.isLoggedIn && <JobsPage />}
                        {startPage}
                    </Route>
                    <Route path='/candidates'>
                        {authCtx.isLoggedIn && <CandidatesPage />}
                        {startPage}
                    </Route>
                </JobContextProvider>
                {/* Redirect the user to the main page */}
                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
