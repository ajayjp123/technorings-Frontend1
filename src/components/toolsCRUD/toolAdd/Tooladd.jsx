import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddTool = ({ open, handleClose, handleAddTool }) => {
  const [toolName, setToolName] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [cost, setCost] = useState("");
  const [numTools, setNumTools] = useState(1);
  const [toolNumbers, setToolNumbers] = useState([]);
  const [toolCodes, setToolCodes] = useState({}); // State to store tool codes

  const handleAdd = () => {
    if (toolName && maxLength && cost && numTools && Object.keys(toolCodes).length === numTools) {
      const newTools = [];
      for (let i = 0; i < numTools; i++) {
        const newTool = {
          tool_code: toolCodes[i + 1], // Get tool code from state
          tool_name: toolName,
          max_life_expectancy_in_mm: parseFloat(maxLength),
          cost: parseFloat(cost),
          length_cut_so_far: 0, // Default value
          no_of_brk_points: 0, // Default value
          tool_efficiency: 100, // Initial value
          tool_number: i + 1,
        };
        newTools.push(newTool);
      }
      handleAddTool(newTools);
      setToolName("");
      setMaxLength("");
      setCost("");
      setNumTools(1);
      setToolNumbers([]);
      setToolCodes({});
      handleClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleNumToolsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setNumTools(value);
      setToolNumbers(Array.from({ length: value }, (_, i) => i + 1));
    }
  };

  const handleToolCodeChange = (toolNumber, value) => {
    setToolCodes({ ...toolCodes, [toolNumber]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Tool</DialogTitle>
      <DialogContent>
        <TextField
          label="Tool Name"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
        <TextField
          label="Max Length"
          value={maxLength}
          onChange={(e) => setMaxLength(e.target.value)}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
        <TextField
          label="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
        <TextField
          label="Number of Tools"
          type="number"
          value={numTools}
          onChange={handleNumToolsChange}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
        {/* Dynamically render input fields for tool codes */}
        {toolNumbers.map((toolNumber) => (
          <TextField
            key={toolNumber}
            label={`Tool Code ${toolNumber}`}
            variant="outlined"
            fullWidth
            size="large"
            margin="normal"
            value={toolCodes[toolNumber] || ""}
            onChange={(e) => handleToolCodeChange(toolNumber, e.target.value)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTool;
