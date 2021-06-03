import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Reserve from './components/Reserve/Reserve';
import Result from './components/Result/Result';
import '@fontsource/roboto';
import 'antd/dist/antd.css';
import './styles/styles.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/reserve">
            <Reserve />
          </Route>

          <Route path="/result">
            <Result />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
