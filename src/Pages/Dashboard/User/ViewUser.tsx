import React, { useState, useEffect } from 'react';
import Card from '../../../Components/Cards/Card';
import { getNonAdminUsers } from '../../../services/userService'; // Adjust the path as necessary

interface User {
  id: string;
  name: string;
  is_admin: boolean;
  // Add other user properties as needed
}

const handleEdit = (userId: string) => {
  console.log(`Edit clicked for user with ID: ${userId}`);
};

const handleDelete = (userId: string) => {
  console.log(`Delete clicked for user with ID: ${userId}`);
};

const ViewList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getNonAdminUsers();
        setUsers(data);
      } catch (error) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (users.length === 0) {
    return <p>No users found until now</p>;
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          {users.map(user => (
            <div key={user.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
              <Card
                title={user.name}
                content="This is the content of the card."
                projectName="Project A" // Adjust based on your requirements
                onEdit={() => handleEdit(user.id)}
                onDelete={() => handleDelete(user.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewList;
