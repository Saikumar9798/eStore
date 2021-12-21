import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Config/Config";
import logo from "../Images/logo.png";
import "./Navbar.css";

export const Navbar = ({ isPending, user, totalProducts }) => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  return (
    <>
      {user !== undefined && (
        <>
          <div className="navbar custom-navbar">
            <div className="leftside">
              <div className="logo d-flex custom-logo">
                <img
                  style={{ cursor: "pointer" }}
                  src={logo}
                  alt="logo"
                  onClick={() => {
                    history.push("/");
                  }}
                />
                <div
                  style={{
                    paddingLeft: "20px",
                    fontSize: "32px",
                    fontStyle: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  eStore
                </div>
              </div>
            </div>
            <div className="rightside custom-text">
              <>
                {user && (
                  // <Link to="/add-products" style={{listStyle:"none"}}>
                    <div
                      className="btn btn-md"
                      style={{
                        fontWeight: "bold",
                        letterSpacing: "2px",
                        background: "#edf9fe",
                        color: "#001C55",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={()=>{history.push("/add-products")}}
                    >
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        style={{ marginRight: "5px" }}
                      ></i>
                      Add new Product
                    </div>
                  // </Link>
                )}
                {!user && (
                  <>
                    <div>
                      <Link className="navlink custom-text" to="signup">
                        SIGN UP
                      </Link>
                    </div>
                    <div>
                      <Link className="navlink custom-text" to="login">
                        LOGIN
                      </Link>
                    </div>
                  </>
                )}
              </>

              {user && (
                <>
                  <div>
                    <div
                      className="navlink d-flex justify-content-center align-items-center custom-text"
                      // to="/"
                    >
                      <i className="fa fa-user fa-2x fa-fw"></i>
                      Hello, {user}
                    </div>
                  </div>
                  <div className="cart-menu-btn custom-icon">
                    <Link className="navlink custom-text" to="cart">
                      <i className="fa fa-shopping-cart fa-2x"></i>
                    </Link>
                    <span
                      className="cart-indicator custom-cart-indicator"
                      style={{
                        fontSize: "12px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                      }}
                    >
                      {totalProducts}
                    </span>
                  </div>
                  <div
                    className="btn btn-danger btn-md"
                    style={{ fontWeight: "bold", letterSpacing: "2px" }}
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
