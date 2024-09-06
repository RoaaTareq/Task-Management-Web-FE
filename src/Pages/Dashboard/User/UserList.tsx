import React from 'react'
import Button from '../../../Components/Buttons/Button'
import ViewUser from './ViewUser'


const UserList: React.FC = () => {
  return (
    <section>
        <div className="container">
            <div className="d-flex justify-content-between">
            <h1>Task</h1>
             {/* <Button
              label="Add Task +"
              type="submit"
              styleType="primary"
             /> */}
            </div>
            <ViewUser/>
        </div>
    </section>
  );
};

export default UserList;
