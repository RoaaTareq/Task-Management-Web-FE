import React from 'react'
import Button from '../../../Components/Buttons/Button'
import ViewProject from './ViewProject'


const ProjectList: React.FC = () => {
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
            <ViewProject/>
        </div>
    </section>
  );
};

export default ProjectList;
