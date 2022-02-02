import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LoginButton from "./LoginButton";

const Header = ({ auth }: { auth: any }) => {
  const absolute = {
    position: "absolute",
  } as React.CSSProperties;

  return (
    <>
      <Link style={absolute} to="/">
        Questo
      </Link>
      <div style={{ ...absolute, right: "10px" }}>
        {auth ? <Link to="/questions">Questions</Link> : null}
        {auth ? <Link to="/users">Users</Link> : ""}
        <LoginButton />
      </div>
    </>
  );
};

function mapStateToProps({ auth }: { auth: any }) {
  return { auth: auth.logged };
}

export default connect(mapStateToProps)(Header);
