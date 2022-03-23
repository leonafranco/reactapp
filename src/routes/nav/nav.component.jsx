import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss"


const Nav = () => {
  return (
    <Fragment>
      <div className = 'nav'>
        <div>sadasda</div>
        <div class= "nav-link-container">
          <Link className ="nav-link" to="/home">
            sadasd
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Nav