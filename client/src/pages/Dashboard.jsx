import React from "react";
import '../assets/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Drone Search & Rescue Dashboard</h1>
      <div className="live-feed-container">
        <p className="live-feed-placeholder">Live feed will appear here</p>
      </div>
    </div>
  );
};

export default Dashboard;
