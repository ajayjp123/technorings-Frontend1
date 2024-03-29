import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Button,
} from "@mui/material";
import { MachinesData } from "../../data";
import "./machines.css";

import Config from "../../components/machineconfig/config";

const Machines = () => {
  const [data, setData] = useState(MachinesData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openView, setOpenView] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("openView state:", openView);
  }, [openView]); // Log openView state whenever it changes

  const handleViewMachine = (machine) => {
    console.log("View Config button clicked");
    setSelectedMachine(machine);
    setOpenView(true); // Set openView to true
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    if ([2, 4, 10, 15, -1].includes(value)) {
      setRowsPerPage(value);
      setPage(0);
    }
  };

  const handleDeleteMachine = (id) => {
    setData(data.filter((machine) => machine.id !== id));
  };

  const handleSearch = () => {
    const filteredData = MachinesData.filter((machine) =>
      machine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="machines-container">
      <h1>MACHINES MANAGEMENT</h1>
      <div className="text-field-container">
        <TextField
          className="text-field"
          label="Search Machine Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Machine ID</TableCell>
              <TableCell className="table-header">Machine Name</TableCell>
              <TableCell className="table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="table-cell">{row.id}</TableCell>
                  <TableCell className="table-cell">{row.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewMachine(row)}
                    >
                      View Config
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteMachine(row.id)}
                      style={{ marginLeft: 10 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        className="machines-pagination"
        rowsPerPageOptions={[2, 4, 10, 15, { label: "All", value: -1 }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {openView && selectedMachine && (
        <Config
          selectedMachine={selectedMachine}
          handleCloseView={handleCloseView}
          openView={openView} // Pass openView as a prop
        />
      )}
    </div>
  );
};

export default Machines;
