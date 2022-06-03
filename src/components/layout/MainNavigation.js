import { Link } from "react-router-dom";

export default function MainNavigation() {
    return (
        <header>
            <div>Purple House</div>
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
