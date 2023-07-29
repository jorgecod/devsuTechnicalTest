import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

describe('Table Component', () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' },
  ];

  const data = [
    { id: '1', name: 'John Doe', age: 30, city: 'New York' },
    { id: '2', name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: '3', name: 'Mike Johnson', age: 40, city: 'Chicago' },
    { id: '4', name: 'Emily Brown', age: 28, city: 'Houston' },
    { id: '5', name: 'Robert Lee', age: 35, city: 'Miami' },
  ];

  test('should render the table with correct columns and data', () => {
    const { getByText, queryByText } = render(<Table columns={columns} data={data} />);

    columns.forEach((column) => {
      const columnHeader = getByText(column.label);
      expect(columnHeader).toBeInTheDocument();
    });

    data.forEach((item) => {
      const rowData = Object.entries(item)
        .filter(([key]) => key !== 'id')
        .map(([_, value]) => value);
        
      rowData.forEach((value) => {
        const cellData = queryByText(value.toString());
        expect(cellData).toBeInTheDocument();
      });
    });
  });

  test('should render the table with actions column when actions prop is provided', () => {
    const mockActions = jest.fn((rowIndex: number) => (
      <button>{`Action ${rowIndex + 1}`}</button>
    ));

    const { getByText } = render(
      <Table columns={columns} data={data} actions={mockActions} />
    );

    data.forEach((_, index) => {
      const actionButton = getByText(`Action ${index + 1}`);
      expect(actionButton).toBeInTheDocument();
    });
  });

  test('should render the correct number of results per page', () => {
    const { getByText } = render(<Table columns={columns} data={data} />);

    const resultsPerPageText = getByText(`${data.length} Resultados`);
    expect(resultsPerPageText).toBeInTheDocument();
  });
});
