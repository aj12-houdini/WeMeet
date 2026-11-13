import React from "react";
import NavBar from "../Nav";
import Body from "./Body";
import Search from "../../Common/search";
import Chat from "../../UserProfile/Chat";
import "../../../css/Dashboard/dashboard.css";

export default function LandingPage({ socket }) {
  return (
    <div className="dashboard">
      <NavBar />
      <main className="dashboard-layout">
        <section className="dashboard-feed">
          <Body />
        </section>
        <aside className="dashboard-sidebar">
          <div className="dashboard-card">
            <h2 className="dashboard-card__title">Find people</h2>
            <Search />
          </div>
          <div className="dashboard-card">
            <Chat socket={socket} />
          </div>
        </aside>
      </main>
    </div>
  );
}
