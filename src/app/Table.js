'use client'; 
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios'; 

const Table = () => {
  const [users, setUsers] = useState([]);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 10, 15, 20]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with the fetched data

        // Dynamically create pagination options
        const options = Array.from({ length: response.data.length - 1 }, (_, i) => i + 2);
        setRowsPerPageOptions(options);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);


  useEffect(() => {
    const result = users.filter(user => {
      return user.name.toLowerCase().includes(search.toLowerCase()) ||
             user.email.toLowerCase().includes(search.toLowerCase()) ||
             user.phone.toLowerCase().includes(search.toLowerCase()) ||
             user.website.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(result);
  }, [search, users]);

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
