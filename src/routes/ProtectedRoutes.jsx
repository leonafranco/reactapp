import { UserContext } from "../context/user.context";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import SignUp from "./signUp/signUp.component";


const ProtectedRoutes = () => {
    const { currentUser } = useContext(UserContext);
    return currentUser ? <Outlet/> : <SignUp />;
};


export default ProtectedRoutes