import React from 'react';
import Card from '../../../Components/Cards/Card'; // Adjust the path as needed

const handleEdit = () => {
  console.log('Edit clicked');
};

const handleDelete = () => {
  console.log('Delete clicked');
};

const ViewProject = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-3">
          <Card
      title="Project Title"
      content="This is the content of the card."
      imageUrl="path/to/image.jpg"
      footer={<div>Footer Content</div>}
      projectName="Project A"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
          </div>
          <div className="col-3">
          <Card
      title="Project Title"
      content="This is the content of the card."
      imageUrl="path/to/image.jpg"
      footer={<div>Footer Content</div>}
      projectName="Project A"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
          </div>
          <div className="col-3">
          <Card
      title="Project Title"
      content="This is the content of the card."
      imageUrl="path/to/image.jpg"
      footer={<div>Footer Content</div>}
      projectName="Project A"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
          </div>
          <div className="col-3">
          <Card
      title="Project Title"
      content="This is the content of the card."
      imageUrl="path/to/image.jpg"
      footer={<div>Footer Content</div>}
      projectName="Project A"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProject;
