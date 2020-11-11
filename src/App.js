import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import Routerconfig from "./router/routerconfig.js";
// import logo from './logo.svg';
import Login from "./view/Login/index.js"
import './App.css';

function App() {
  return (
    <div className="App">

      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          {
            Routerconfig.routes.map((item, index) => {
              return <Route key={index}
                path={item.path} 
                
                render={props => {
                  return <item.component children={item.children} {...props}></item.component>
                }}>
              </Route>
            })
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;