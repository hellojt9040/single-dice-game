import React from "react";
import { Outlet } from "react-router-dom";
import GameBoard from "../../containers/GameBoard";
import Header from "../Header";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
