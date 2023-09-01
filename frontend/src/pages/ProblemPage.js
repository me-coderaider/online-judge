import { useParams } from "react-router-dom";
//  this is problem specific file
// now, we also want to know i.e. aginst which id this particular page was called
// eg. in this case PROBLEMCODE, SO, using this we can fetch data from the DATABASE
// and to know the id we'll use "useParams"
function ProblemPage(){
    const params=useParams();
    return (
        <>
            <h1>specific coding problem</h1>
            <p>{params.problem_code}</p>
        </>
    );
}

export default ProblemPage; 