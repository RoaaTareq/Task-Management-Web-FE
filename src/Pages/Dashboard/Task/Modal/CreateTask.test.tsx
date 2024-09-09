import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateTask from './CreateTask'; // Adjust import path as necessary

// Mock functions
const mockOnAddTask = jest.fn();
const mockOnClose = jest.fn();

describe('CreateTask Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders CreateTask component with form elements', () => {
    render(<CreateTask onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Select Project/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Task Description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Select Priority/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<CreateTask onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText(/Select Project/i), { target: { value: 'project1' } });
    fireEvent.change(screen.getByPlaceholderText(/Task Description/i), { target: { value: 'Task Description' } });
    fireEvent.change(screen.getByPlaceholderText(/Select Priority/i), { target: { value: 'high' } });
    fireEvent.change(screen.getByPlaceholderText(/Start Date/i), { target: { value: '2024-09-01' } });
    fireEvent.change(screen.getByPlaceholderText(/End Date/i), { target: { value: '2024-09-02' } });

    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith({
        title: 'New Task',
        projectName: 'project1',
        content: 'Task Description',
        priority: 'high',
        startTime: '2024-09-01',
        endTime: '2024-09-02',
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('shows error message with missing data', async () => {
    render(<CreateTask onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText(/Add Task/i));

    expect(await screen.findByText(/All fields are required./i)).toBeInTheDocument();
    expect(mockOnAddTask).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('closes form on click outside', () => {
    const { container } = render(<CreateTask onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    fireEvent.mouseDown(document);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not close form on click inside', () => {
    const { container } = render(<CreateTask onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    fireEvent.mouseDown(container.querySelector('form')!);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
