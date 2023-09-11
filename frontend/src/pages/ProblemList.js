import {Link} from 'react-router-dom';
//  here each problem will have different path(URL) so, how are we going to make it dynamic
// here we'll be getting the problem-list from back and kind of array
const PROBLEMS_LIST=[
    {
      problemStatement: 'Given an integer array of size n and a target X, find two indexes in the array, such their sum equals to target',
      name: 'Two Sum',
      code: 'oj_ts_1',
      difficulty: 'easy'
    },
    {
      problemStatement: 'Given 2 integer sorted array, merge both of the array in single array',
      name: 'Merge 2 Sorted Array',
      code: 'oj_msa_2',
      difficulty: 'medium'
    }
  ];

function ProblemList(){
    return (
        <>
            <h1>Problems List</h1>
            <ul >
                {PROBLEMS_LIST.map((problem => (
                    <li key={problem.problemStatement}>
                        <Link to={`/problems_list/${problem.code}`}>{problem.name}</Link></li>)
                ))}
            </ul>
        </>
    );
}

export default ProblemList;