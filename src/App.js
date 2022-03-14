// import { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import * as ROUTES from "./constants/routes";
// import Homepage from "./components/homepage.component";
import HomePage from "./components/homepage.component";
import "./homepage.styles.scss";

//const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <div>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
