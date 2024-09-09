import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskList from "./Task/Task";
import Summary from './Summary'
import TaskDetail from './Task/TaskbyId'

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
                            <Route path="/summary" element={<Summary />} />
                            <Route path="/tasks/:id" element={<TaskDetail/>} />
                                                  </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DashboardLayout);
