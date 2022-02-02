import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { logout } from "../features/auth"

const LoginButton = ({
  auth,
  logoutUser,
}: {
  auth: any;
  logoutUser: Function;
}) => {
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    logoutUser();
  };

  const authButton = auth ? (
    <a href="" onClick={handleLogout}>
      Logout
    </a>
  ) : (
    <Link to="/login">Login</Link>
  );

  return <>{authButton}</>;
};

function mapStateToProps({ auth }: { auth: any }) {
  return { auth: auth.logged };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // @ts-ignore
  logoutUser: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
