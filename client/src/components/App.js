import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import PostboxPage from './views/PostboxPage/PostboxPage';
import WritePage from "./views/WritePage/WritePage";
import NavBar from "./views/NavBar/NavBar";
import Auth from '../hoc/auth';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route exact path="/" element={Auth(LandingPage, null)} />
            <Route exact path="/login" element={Auth(LoginPage, false)} />
            <Route exact path="/register" element={Auth(RegisterPage, false)} />
            <Route exact path="/post/:userId" element={Auth(PostboxPage, null)} />
            <Route exact path="/write/:userId" element={Auth(WritePage, false)} />
          </Routes> 
        </div>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
