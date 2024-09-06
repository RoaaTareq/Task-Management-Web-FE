import React from 'react';
import Table from '../../../Components/Table/Table'; // Adjust the path as necessary

const handleEdit = (row: Record<string, any>) => {
  console.log('Edit', row);
};

const handleDelete = (row: Record<string, any>) => {
  console.log('Delete', row);
};

const columns = ['Name', 'Project Name', 'Email'];
const data = [
  { Name: 'John Doe', 'Project Name': 'Project A', Email: 'john@example.com' },
  { Name: 'Jane Smith', 'Project Name': 'Project B', Email: 'jane@example.com' }
];

const ViewUser: React.FC = () => (
  <Table 
    columns={columns} 
    data={data} 
    onEdit={handleEdit} 
    onDelete={handleDelete}
  />
);

export default ViewUser;
