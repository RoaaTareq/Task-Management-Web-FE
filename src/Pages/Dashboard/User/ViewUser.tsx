import React, { useState, useEffect } from 'react';
import Card from '../../../Components/Cards/Card';
import { getNonAdminUsers } from '../../../services/userService'; // Adjust the path as necessary

interface User {
  id: string;
  name: string;
  is_admin: boolean;
  // Add other user properties as needed
}

const ViewList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const data = await getNonAdminUsers(page);
      setUsers(data.data); // Adjust based on the API response structure
      setTotalPages(data.last_page); // Adjust based on the API response structure
    } catch (error) {
      setError('Error fetching users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

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
        <div className="row p-0">
          {users.map(user => (
            <div key={user.id} className="p-0 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
              <Card
                title={user.name}
                content="This is the content of the card."
                projectName="Project A" // Adjust based on your requirements
              />
            </div>
          ))}
        </div>
        <div className="pagination d-flex align-items-center">
          <button
          className='btn-page'
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className='btn-page'
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewList;
