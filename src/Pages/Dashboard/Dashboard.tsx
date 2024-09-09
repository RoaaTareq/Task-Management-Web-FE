import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskList from "./Task/Task";
// import UserList from "./User/UserList";
// import ProjectList from "./Project/ProjectList";


import "./dashboard.css";

const DashboardLayout = () => {
    return (
        <div className="dashboard-container">
           

            <div className="main-content">
                {/* <Navbar /> */}
                <div className="content">
                    <div className="dashboard-content">
                        <Routes>
                            <Route path="/tasks" element={<TaskList />} />
                            {/* <Route path="/users" element={<UserList />} /> */}
                            {/* <Route path="/projects" element={<ProjectList />} /> */}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DashboardLayout);
