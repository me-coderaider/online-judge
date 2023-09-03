import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation(){
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {/* use NavLink tag */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/problems_list">Problems</Link></li>
                    <li><Link to="/auth">Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default MainNavigation;