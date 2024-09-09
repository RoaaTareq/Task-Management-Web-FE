import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

    useEffect(() => {
        fetchStatistics();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Data for the priority statistics bar chart
    const priorityData = {
        labels: ['Low', 'Medium', 'High'],
        datasets: [
            {
                label: 'Number of Tasks',
                data: [
                    statistics.priority_statistics.low,
                    statistics.priority_statistics.medium,
                    statistics.priority_statistics.high
                ],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            }
        ]
    };

    // Data for the tasks per category bar chart
    const categoryLabels = Object.keys(statistics.tasks_per_category);
    const categoryData = Object.values(statistics.tasks_per_category).map((count: any) => count.length);
    const categoryChartData = {
        labels: categoryLabels,
        datasets: [
            {
                label: 'Tasks per Category',
                data: categoryData,
                backgroundColor: '#4BC0C0',
            }
        ]
    };

    // Data for the task overview bar chart (Total, Completed, Pending)
    const taskOverviewData = {
        labels: ['Total Tasks', 'Completed Tasks', 'Pending Tasks'],
        datasets: [
            {
                label: 'Task Overview',
                data: [
                    statistics.total_tasks,
                    statistics.completed_tasks,
                    statistics.pending_tasks,
                ],
                backgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384'], // You can adjust these colors
            },
        ],
    };

    return (
        <div className="dashboard">
          
            <div className="priority-section" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Priority Statistics</h3>
                <Bar
                    data={priorityData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Tasks by Priority'
                            }
                        }
                    }}
                />
            </div>

            {/* Task Overview Bar Chart */}
            <div className="task-overview-section" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Task Overview</h3>
                <Bar
                    data={taskOverviewData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Overview of Total, Completed, and Pending Tasks'
                            }
                        }
                    }}
                />
            </div>

        </div>
    );
};

export default Dashboard;
