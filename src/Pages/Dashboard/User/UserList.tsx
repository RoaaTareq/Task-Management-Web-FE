import React from "react";
import Button from "../../../Components/Buttons/Button";
import ViewUser from "./ViewUser";

const UserList: React.FC = () => {
    return (
        <section className="mt-4">
            <div className="container">
                <h1>Users</h1>

                <ViewUser />
            </div>
        </section>
    );
};

export default UserList;
