import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Index from "../Pages/Index";
import ViewMovies from "../Pages/ViewMovies";
import AddMovie from "../Pages/AddMovie";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/view/:id" component={ViewMovies} exact />
        <Route path="/add" component={AddMovie} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/profile" component={Profile} exact />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
