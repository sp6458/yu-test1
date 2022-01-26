import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';
import background from "./background.jpg";
function App() {
  return (
    <BrowserRouter>
    <div className="App container" style={{ backgroundImage: `url(${background})` }}>
      <h3 className="d-flex justify-content-center m-3">
        Company
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/department">
              Departments
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/employee">
              Employees
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/department' component={Department}/>
        <Route path='/employee' component={Employee}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;