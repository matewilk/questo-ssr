import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ auth }: { auth: any }) => {
  const authButton = auth ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/login">Login</a>
  );

  return (
    <div>
      <Link to="/">Questo</Link>
      <div>
        <Link to="/questions">Questions</Link>
        <Link to="/users">Users</Link>
        {authButton}
      </div>
    </div>
  );
};

function mapStateToProps({ auth }: { auth: any }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
