import React from "react";
import Sidebar from "../../../Components/Layout/SideBar"; // Import the Sidebar component

const SideBar: React.FC = () => {
    // Define the sidebar items with routes and text
    const sidebarItems = [
        { href: "/project", text: "Project List" },
        { href: "/user", text: "User List" },
        { href: "/task", text: "Task List" },
    ];

    return (
        <div className="dashboard">
            <Sidebar items={sidebarItems}  className="custom-sidebar" style={{ backgroundColor: "#f8f9fa", padding: "20px" }} />
        </div>
    );
};

export default SideBar;
