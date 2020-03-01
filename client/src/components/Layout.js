import React from "react";
import Header from "./Header";

const Layout = ({ children, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
