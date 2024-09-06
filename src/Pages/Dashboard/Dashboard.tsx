import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskList from "./Task/Task";
import UserList from "./User/UserList";
import ProjectList from "./Project/ProjectList";
import Sidebar from "../Dashboard/Layout/Sidebar";

import "./dashboard.css";

const DashboardLayout = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="main-content">
                {/* <Navbar /> */}
                <div className="content">
                    <div className="dashboard-content">
                        <Routes>
                            <Route path="/task" element={<TaskList />} />
                            <Route path="/user" element={<UserList />} />
                            <Route path="/project" element={<ProjectList />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DashboardLayout);
