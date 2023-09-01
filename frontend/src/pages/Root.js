import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from './Root.module.css';

function RootLayout(){
    return (
        <>
            <MainNavigation/>
            <main className={classes.content}>
                <Outlet/> 
            </main>
            {/* // marks the place where child routes element should be rendered */}
        </>
    );
}

export default RootLayout;