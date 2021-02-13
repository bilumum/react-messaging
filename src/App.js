/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Login from './Login'
import Chat from './Chat'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
