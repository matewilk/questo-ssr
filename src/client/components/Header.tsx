import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LoginButton from "./LoginButton";

const Header = ({ auth }: { auth: any }) => {
  return (
    <div>
      <Link to="/">Questo</Link>
      <div>
        <Link to="/questions">Questions</Link>
        {auth ? <Link to="/users">Users</Link> : ""}
        <LoginButton />
      </div>
    </div>
  );
};

function mapStateToProps({ auth }: { auth: any }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
