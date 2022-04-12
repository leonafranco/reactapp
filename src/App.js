import "./pages/homepage/homepage.styles.scss";
import Home from "./routes/home/home.component";
import Nav from "./routes/nav/nav.component";
import NavBarPost from "./components/navbar-post/navbar-post.component";
import SignUp from "./routes/signUp/signUp.component";
import CreatePost from "./routes/createPost/createPost.component";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Nav />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/" element={<SignUp />} />
      <Route path="/new" element={<NavBarPost />}>
        <Route path="/new" element={<CreatePost />} />
      </Route>
    </Routes>
  );
};

export default App;
