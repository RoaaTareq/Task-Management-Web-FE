import React from 'react';
import './Table.scss';

interface TableProps {
  className?: string;
  columns: string[];
  data: Record<string, any>[];
  renderers?: Record<string, (row: Record<string, any>) => React.ReactNode>;
  onEdit?: (row: Record<string, any>) => void; // Add this line
  onDelete?: (row: Record<string, any>) => void; // Add this line
}

const Table: React.FC<TableProps> = ({ 
  className = '', 
  columns, 
  data, 
  renderers = {}, 
  onEdit, 
  onDelete 
}) => {
  const hasActions = onEdit || onDelete;

  return (
    <table className={`table ${className}`}>
      <thead className='table-heading'>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          {hasActions && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={`${rowIndex}${colIndex}`}>
                {renderers[column] ? renderers[column](row) : row[column]}
              </td>
            ))}
            {hasActions && (
              <td className='d-flex justify-content-center'>
                {onEdit && <button  className="actionbtn"onClick={() => onEdit(row)}>Edit</button>}
                {onDelete && <button className="actionbtn" onClick={() => onDelete(row)}>Delete</button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
