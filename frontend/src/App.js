import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Users from "./users/pages/Users";
import NewProblem from "./problems/pages/NewProblem";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import SingleProblem from "./singleProblem/pages/SingleProblem";
import AddNewProblem from "./singleProblem/pages/AddNewProblem";
import UpdateProblem from "./singleProblem/pages/UpdateProblem";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />}></Route>
        <Route path="/problems" element={<NewProblem />}></Route>
        <Route path="/new_problem" element={<AddNewProblem />}></Route>
        <Route path="/problems/:probId" element={<SingleProblem />}></Route>
        <Route
          path="/updateproblem/:probId"
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
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
