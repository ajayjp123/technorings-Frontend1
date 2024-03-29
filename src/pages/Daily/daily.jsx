import React, { useState, useEffect } from "react";
import "./daily.css";
import Select from "react-select";

const Daily = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machines] = useState([
    { label: "M1", value: "M1" },
    { label: "M2", value: "M2" },
    { label: "M3", value: "M3" },
    { label: "M4", value: "M4" },
    { label: "M5", value: "M5" },
    { label: "M6", value: "M6" },
  ]);

  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data
  const [targetAchievedArray, setTargetAchievedArray] = useState([]); // Array to store target achieved for each machine
  const [meanTargetAchieved, setMeanTargetAchieved] = useState(0); // State to store the mean of target achieved

  useEffect(() => {
    // Calculate mean of target achieved whenever targetAchievedArray changes
    const calculateMean = () => {
      if (targetAchievedArray.length > 0) {
        const sum = targetAchievedArray.reduce((acc, curr) => acc + curr, 0);
        const mean = sum / targetAchievedArray.length;
        setMeanTargetAchieved(mean);
      } else {
        setMeanTargetAchieved(0);
      }
    };

    calculateMean();
  }, [targetAchievedArray]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      employeeName,
      selectedShift,
      selectedMachines,
    };

    // Store the submitted data
    setSubmittedData(formData);

    // Clear the targetAchievedArray when the form is submitted
    setTargetAchievedArray([]);
  };

  const handleMachineChange = (selectedOptions) => {
    setSelectedMachines(selectedOptions);
  };

  const handleKeyDown = (event) => {
    // Calculate mean of target achieved when Enter key is pressed
    if (event.key === "Enter") {
      const targetArray = submittedData.selectedMachines.map(
        (machine) => machine.targetAchieved || 0
      );
      setTargetAchievedArray(targetArray);
    }
  };

  if (submittedData) {
    // If form submitted, display the submitted data
    return (
      <div id="body">
        <h1 className="daily-h1"> Daily Submissions</h1>
        <p className="efficiency">Efficiency: {meanTargetAchieved}</p>
        <div className="daily-data">
          {/* Parent container to hold all machine boxes */}
          <div className="big-box">
            {submittedData.selectedMachines.map((machine, index) => (
              <div key={index} className="daily-box">
                <h3 className="machine-label">Machine: {machine.label}</h3>
                <p className="employee-name">
                  Employee Name: {submittedData.employeeName}
                </p>
                <p className="shift">Shift: {submittedData.selectedShift}</p>
                <input
                  type="number"
                  placeholder="Target Achieved"
                  className="machine-target-input"
                  onChange={(e) => {
                    const newTargetArray = [...targetAchievedArray];
                    newTargetArray[index] = parseInt(e.target.value) || 0;
                    setTargetAchievedArray(newTargetArray);
                  }}
                />
                <p className="total-target">
                  Total Target: <span>100</span>
                </p>
                <label className="breakdown-label">
                  <input type="checkbox" className="breakdown-checkbox" />
                  Breakdown
                </label>
              </div>
            ))}
            <label className="partialshift-label">
              <input type="checkbox" className="partialshift-checkbox" />
              PartialShift
            </label>
            <button className="daily-submisssion-btn">submit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="form-title">Daily Entry Form</h2>
      <div className="daily-entry-form">
        <form onSubmit={handleSubmit} className="animated-form">
          <div className="form-group animated-form-item">
            <label htmlFor="employeeName" className="animated-label">
              Employee Name:
            </label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
              className="animated-input"
            />
          </div>
          <div className="form-group animated-form-item">
            <label htmlFor="shift" className="animated-label">
              Shift:
            </label>
            <select
              id="shift"
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              required
              className="animated-select"
            >
              <option value="">Select Shift</option>
              <option value="shift1">Shift 1</option>
              <option value="shift2">Shift 2</option>
              <option value="shift3">Shift 3</option>
            </select>
          </div>
          <div className="form-group animated-form-item">
            <label className="animated-label">Machines:</label>
            <Select
              options={machines}
              value={selectedMachines}
              onChange={handleMachineChange}
              isMulti
              placeholder="Select Machines"
              className="dropdown-select"
              classNamePrefix="select"
              menuPlacement="auto"
              menuPortalTarget={document.body}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              isSearchable
              isClearable
              // You can add more props as needed
            />
          </div>
          <button type="submit" className="submit-btn animated-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Daily;
