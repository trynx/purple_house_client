import { Route, Switch } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import AllCandidates from "./pages/AllCandidates";
import AllJobs from "./pages/AllJobs";
import Login from "./pages/Login";

function App() {
    return (
        <div>
            <MainNavigation />
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
        </div>
    );
}

export default App;
