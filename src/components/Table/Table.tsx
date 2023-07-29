import { ChangeEvent, ReactNode, useState } from 'react';
import './table.css';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (rowIndex: number, productId: string) => ReactNode;
}

const Table = ({ columns, data, actions }: TableProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;
  const startIndex =
    (currentPage - 1) * resultsPerPage >= data.length
      ? 0
      : (currentPage - 1) * resultsPerPage;

  const handlePageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
  };

  const totalPages = Math.ceil(data.length / resultsPerPage);
  const pageOptions = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visibleData = data.slice(startIndex, startIndex + resultsPerPage);

  return (
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
            {actions && <th></th>}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.key === 'logo' ? (
                    <img
                      alt={column.label}
                      src={item[column.key]}
                      width={50}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `${process.env.REACT_APP_IMAGE_URL}`;
                      }}
                    />
                  ): (
                    item[column.key]
                  )}
                </td>
              ))}
              {actions && (
                <td>{actions(index, item.id)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='table-footer'>
        <span>{`${visibleData.length} Resultados`}</span>
        <select value={currentPage} onChange={handlePageChange}>
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Table;
