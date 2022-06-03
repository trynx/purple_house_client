import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Purple House</div>
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
