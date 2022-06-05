import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
    return (
        // TODO: Can add logout here
        <header className={classes.header}>
            <Link to='/' className={classes.logo}>
                Purple House
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to='/jobs'>Jobs</Link>
                    </li>
                    <li>
                        <Link to='/candidates'>Candidates</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
