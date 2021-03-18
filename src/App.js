import logo from './logo.svg';
import './scss/index.scss';
import './App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// screens
import SignInScreen from './screens/sign-in/index';
import SignUpScreen from './screens/sign-up/index';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={SignInScreen} />
          <Route path="/signUp" component={SignUpScreen} />
        </div>
      </Router>
    </div>
  );
}

export default App;
