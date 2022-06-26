import "./pages/homepage/homepage.styles.scss";
import Home from "./routes/home/home.component";
import Nav from "./routes/nav/nav.component";
import SignUp from "./routes/signUp/signUp.component";
import CreatePost from "./routes/createPost/createPost.component";
import Contact from "./routes/contact/contact.component";
import Perfil from "./routes/perfil/perfil.component";
import Comment from "./routes/comment/comment.component";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes/>}>
      <Route path="/home" element={<Nav />}>
        <Route path="/home" element={<Home />} />
      </Route>
      </Route>
      <Route path="/" element={<SignUp />} />
      <Route path="/new" element={<Nav />}>
        <Route path="/new" element={<CreatePost />} />
      </Route>
      <Route element={<Nav />}>
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route element={<Nav />}>
        <Route path="/perfil" element={<Perfil />} />
      </Route>
      <Route element={<Nav />}>
        <Route path="home/:docId" element={<Comment />} />
      </Route>
      <Route element={<Nav />}>
        <Route path="ofertas/:docId" element={<Comment />} />
      </Route>
    </Routes>
  );
};

export default App;
