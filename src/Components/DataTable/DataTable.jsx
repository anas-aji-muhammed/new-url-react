import React from 'react';
import './DataTable.css';
import { useNavigate } from "react-router-dom";

function DataTable({ data }) {
    let navigate = useNavigate();

  // Function to format date from ISO to dd-mm-yyyy
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Short URL</th>
          <th>Long URL</th>
          <th>isActive</th>
          <th>Created</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {data.urlData.map(row => (
          <tr key={row.id}>
            <td>{data.baseURL}{row.urlHash}</td>
            <td>{row.originalURL}</td>
            <td>true</td>
            <td>{formatDate(row.createdDateTime)}</td>
            <td>
                <button onClick={()=>{
                    navigate(`/details/${row.id}`, { state: {baseUrl: data.baseURL, urlData:row}});
                }}>View Details</button>
                </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
