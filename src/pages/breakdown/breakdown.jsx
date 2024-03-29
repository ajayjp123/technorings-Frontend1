import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Slide,
} from "@mui/material";
import { breakdownData } from "../../data";
import "./breakdown.css";
import AddBreakdown from "./Addbreakdown";

const Breakdown = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddBreakdown, setOpenAddBreakdown] = useState(false); // State to control the visibility of AddBreakdown

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenAddBreakdown = () => {
    setOpenAddBreakdown(true);
  };

  const handleCloseAddBreakdown = () => {
    setOpenAddBreakdown(false);
  };

  const handleAddBreakdown = (newBreakdown) => {
    // Logic to add the breakdown data
    console.log("Adding breakdown:", newBreakdown);
  };

  return (
    <div className="breakdown-container">
      <h1>Breakdown Management</h1>
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Print
      </Button>
      {/* Add "Add" button with animation */}
      <Slide direction="up" in={!openAddBreakdown}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddBreakdown}
          className="b-2"
        >
          Add
        </Button>
      </Slide>
      <TableContainer component={Paper}>
        <Table className="enlarged-table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Date</TableCell>
              <TableCell className="table-header">Length Used</TableCell>
              <TableCell className="table-header">
                Expected Length Remaining
              </TableCell>
              <TableCell className="table-header">Replaced By</TableCell>
              <TableCell className="table-header">Reason</TableCell>
              <TableCell className="table-header">Change Time</TableCell>
              <TableCell className="table-header">Hours into Shift</TableCell>
              <TableCell className="table-header">Machine ID</TableCell>
              <TableCell className="table-header">Tool Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? breakdownData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : breakdownData
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell className="table-cell">{row.date}</TableCell>
                <TableCell className="table-cell">{row.lengthUsed}</TableCell>
                <TableCell className="table-cell">
                  {row.expectedLengthRemaining}
                </TableCell>
                <TableCell className="table-cell">{row.replacedBy}</TableCell>
                <TableCell className="table-cell">{row.reason}</TableCell>
                <TableCell className="table-cell">{row.changeTime}</TableCell>
                <TableCell className="table-cell">
                  {row.hoursIntoShift}
                </TableCell>
                <TableCell className="table-cell">{row.machineId}</TableCell>
                <TableCell className="table-cell">{row.toolCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="breakdown-pagination"
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={breakdownData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* AddBreakdown component */}
      <AddBreakdown
        open={openAddBreakdown}
        handleClose={handleCloseAddBreakdown}
        handleAddBreakdown={handleAddBreakdown}
      />
    </div>
  );
};

export default Breakdown;
