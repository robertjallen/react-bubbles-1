import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import Login from "./components/Login";
import "./styles.scss";
import BubblesPage from './components/BubblePage'


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <ProtectedRoute exact path="/bubbles" component={BubblesPage}/>
      </div>
    </Router>
  );
}

export default App;
