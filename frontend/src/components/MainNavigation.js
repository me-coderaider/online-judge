import {NavLink} from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation(){
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {/* use NavLink tag */}
                    <li ><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/problems_list">Problems</NavLink></li>
                    <li><NavLink to="/login">Log In</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}
export default MainNavigation;