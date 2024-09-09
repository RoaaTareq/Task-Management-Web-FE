import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TaskCategory {
    [key: string]: any[]; // Replace `any` with your task type if possible
}

interface Statistics {
    total_tasks: number;
    completed_tasks: number;
    pending_tasks: number;
    priority_statistics: {
        low: number;
        medium: number;
        high: number;
    };
    tasks_per_category: TaskCategory;
}

const Dashboard = () => {
    const [statistics, setStatistics] = useState<Statistics>({
        total_tasks: 0,
        completed_tasks: 0,
        pending_tasks: 0,
        priority_statistics: {
            low: 0,
            medium: 0,
            high: 0,
        },
        tasks_per_category: {},
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStatistics = async () => {
        try {
            const token = localStorage.getItem('token');  // Fetch token from local storage
            console.log('Token:', token); // Check if token is retrieved properly
            const response = await axios.get('http://127.0.0.1:8000/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,  // Correct format
                }
            });
            setStatistics(response.data);
            setLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setLoading(false);
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard">
            <h2>Task Statistics Dashboard</h2>
            <div className="stats-section">
                <p><strong>Total Tasks:</strong> {statistics.total_tasks}</p>
                <p><strong>Completed Tasks:</strong> {statistics.completed_tasks}</p>
                <p><strong>Pending Tasks:</strong> {statistics.pending_tasks}</p>
            </div>
            <div className="priority-section">
                <h3>Priority Statistics</h3>
                <p><strong>Low Priority:</strong> {statistics.priority_statistics.low}</p>
                <p><strong>Medium Priority:</strong> {statistics.priority_statistics.medium}</p>
                <p><strong>High Priority:</strong> {statistics.priority_statistics.high}</p>
            </div>
            <div className="category-section">
                <h3>Tasks per Category</h3>
                {Object.keys(statistics.tasks_per_category).length > 0 ? (
                    <ul>
                        {Object.entries(statistics.tasks_per_category).map(([category, tasks], index) => (
                            <li key={index}>
                                <strong>{category}:</strong> {(tasks as Array<any>).length} tasks
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No categories assigned yet.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
