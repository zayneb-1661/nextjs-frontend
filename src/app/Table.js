// Importing necessary libraries and components
'use client'; 
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios'; 

// Defining the Table component
const Table = () => {
  // State for storing users data
  const [users, setUsers] = useState([]);
  // State for pagination options
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 10, 15, 20]);
  // State for search query
  const [search, setSearch] = useState('');
  // State for storing filtered users based on search
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetching users data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requesting users data from the API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // Setting users data to state
        setUsers(response.data);
        setFilteredUsers(response.data); 
        // Dynamically setting pagination options based on data length
        const options = Array.from({ length: response.data.length - 1 }, (_, i) => i + 2);
        setRowsPerPageOptions(options);
      } catch (error) {
        // Logging error in case of failure
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);

  // Filtering users based on search query
  useEffect(() => {
    const result = users.filter(user => {
      return user.name.toLowerCase().includes(search.toLowerCase()) ||
             user.email.toLowerCase().includes(search.toLowerCase()) ||
             user.phone.toLowerCase().includes(search.toLowerCase()) ||
             user.website.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(result);
  }, [search, users]);

  // Defining columns for DataTable
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Website',
      selector: (row) => row.website,
      sortable: true,
    }
  ];
  
  // Rendering the DataTable component with props
  return (
    <div className="container">
      <DataTable 
        columns={columns} 
        data={filteredUsers} 
        fixedHeader
        title="Users List"
        pagination
        paginationRowsPerPageOptions={rowsPerPageOptions}
        paginationPerPage={rowsPerPageOptions[0]}
        subHeader
        subHeaderComponent={
          <input 
            type="text" 
            placeholder="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        }
      />
    </div>
  );
};


export default Table;