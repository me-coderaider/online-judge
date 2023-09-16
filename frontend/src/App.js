import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Users from "./users/pages/Users";
import NewProblem from "./problems/pages/NewProblem";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import SingleProblem from "./singleProblem/pages/SingleProblem";
import AddNewProblem from "./singleProblem/pages/AddNewProblem";
import UpdateProblem from "./singleProblem/pages/UpdateProblem";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />}></Route>
        <Route path="/problems" element={<NewProblem />}></Route>
        <Route path="/new_problem" element={<AddNewProblem />}></Route>
        <Route path="/problems/:probId" element={<SingleProblem />}></Route>
        <Route
          path="/updateproblem/:creatorId/:probId"
          element={<UpdateProblem />}
        ></Route>
        <Route path="*" element={<Navigate replace to="/"></Navigate>} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />}></Route>
        <Route path="/problems" element={<NewProblem />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<Navigate replace to="/auth"></Navigate>} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>
           {routes}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

// import {createBrowserRouter,
// 	//createRoutesFromElements ,
// 	RouterProvider,
// 	//Router,
// 	//Route
// }
// 	from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ProblemList from './pages/ProblemList';
// import RootLayout from './pages/Root';
// import ErrorPage from './pages/ErrorPage';
// import AuthenticationPage, {action as authAction} from './pages/Authentication';
// import ProblemPage from './pages/ProblemPage';
// import AuthFormSignUp from './components/AuthFormSignUp';

// // const routeDefinitions=createRoutesFromElements(
// // 	<Route>
// // 		<Route path="/" element={<HomePage/>}></Route>
// // 		<Router path="/problem-list" element={<ProblemList/>}/>
// // 	</Route>

// // ); 2nd

// const router= createBrowserRouter([
// 	{
// 		path:"/",
// 		element : <RootLayout/>, // this component will act as wrapper for
// 		errorElement: <ErrorPage/>,
// 		children : [
// 			{index:true, element: <HomePage />}, // index=true means it'll run for /(root ) or empty '' path
// 			// {path : '', element: <HomePage />},
// 			{path:'/problems_list', element:<ProblemList/>},
// 			{path:'/problems_list/:problem_code', element:<ProblemPage/>},
// 			{path: '/login', element:<AuthenticationPage/>, action:authAction},
// 			{path: '/signup', element:<AuthFormSignUp/>}
// 			// {path:'/successful'}

// 		]
//  	},
//  // adding this for applying navigation header to all of the pages
// ]);

// // const router=createBrowserRouter(routeDefinitions); 2nd

// function App(){
//   return <RouterProvider router={router}/>;
// }

// export default App;
