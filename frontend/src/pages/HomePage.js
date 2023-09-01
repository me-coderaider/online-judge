import {Link} from 'react-router-dom'

function HomePage(){
    return (
        <>
            <h1>home page of OJ</h1>
            <p>
                {/* Go to <a href="/problems-list"> the list of problems.</a> */}
                Go to <Link to="/problems_list"> the list of problems.</Link>

            </p>
        </>
    );
}

export default HomePage;