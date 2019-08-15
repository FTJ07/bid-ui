import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/auth/Signin';
import SingUp from './components/auth/Signup';
 

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Header />
        </div>

          <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SingUp} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
