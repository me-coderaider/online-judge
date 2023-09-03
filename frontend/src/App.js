import {createBrowserRouter, 
	//createRoutesFromElements , 
	RouterProvider, 
	//Router, 
	//Route
} 
	from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProblemList from './pages/ProblemList';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
// import ProblemPage from './pages/ProblemPage';
import AuthenticationPage, {action as authAction} from './pages/Authentication';

// const routeDefinitions=createRoutesFromElements(
// 	<Route>
// 		<Route path="/" element={<HomePage/>}></Route>
// 		<Router path="/problem-list" element={<ProblemList/>}/>
// 	</Route>

// ); 2nd

const router= createBrowserRouter([
	{
		path:"/",
		element : <RootLayout/>, // this component will act as wrapper for 
		errorElement: <ErrorPage/>,
		children : [
			{index:true, element: <HomePage />}, // index=true means it'll run for /(root ) or empty '' path
			// {path : '', element: <HomePage />},
			{path:'/problems_list', element:<ProblemList/>},
			{path: '/auth', element:<AuthenticationPage/>, action:authAction}
		]
 	}, 
 // adding this for applying navigation header to all of the pages	
]);

// const router=createBrowserRouter(routeDefinitions); 2nd

function App(){
  return <RouterProvider router={router}/>;
}

export default App;