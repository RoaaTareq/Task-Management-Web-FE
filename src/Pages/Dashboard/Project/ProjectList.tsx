import React from 'react'
import Button from '../../../Components/Buttons/Button'



const ProjectList: React.FC = () => {
  return (
    <section>
        <div className="container">
            <div className="d-flex">
            <h1>Task</h1>
             <Button
              label="Add Task +"
              type="submit"
              styleType="primary"
             />
            </div>
        </div>
    </section>
  );
};

export default ProjectList;
