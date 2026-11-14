import React from "react";
import DashboardNavBar from "../DashboardNavBar";
import Feed from "./Feed";
import UserSearch from "../../Common/UserSearch";
import Chat from "../../UserProfile/Chat";
import "../../../css/Dashboard/dashboard.css";

export default function DashboardHome({ socket }) {
  return (
    <div className="dashboard">
      <DashboardNavBar />
      <main className="dashboard-layout">
        <section className="dashboard-feed">
          <Feed />
        </section>
        <aside className="dashboard-sidebar">
          <div className="dashboard-card">
            <h2 className="dashboard-card__title">Find people</h2>
            <UserSearch />
          </div>
          <div className="dashboard-card">
            <Chat socket={socket} />
          </div>
        </aside>
      </main>
    </div>
  );
}
