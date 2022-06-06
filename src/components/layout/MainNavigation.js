import { Link } from "react-router-dom";
import { useAuthCtx } from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
    const authCtx = useAuthCtx();

    return (
        <header className={classes.header}>
            <Link to='/' className={classes.logo}>
                Purple House
            </Link>
            <nav>
                <ul>
                    {authCtx.isLoggedIn && (
                        <li>
                            <Link to='/jobs'>Jobs</Link>
                        </li>
                    )}
                    {authCtx.isLoggedIn && (
                        <li>
                            <Link to='/candidates'>Candidates</Link>
                        </li>
                    )}
                    {authCtx.isLoggedIn && (
                        <li>
                            <button onClick={authCtx.logout}>Log Out</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
