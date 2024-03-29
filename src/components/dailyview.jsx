import React, { useState } from "react";
import "./dailyview.css";

const DailyView = ({ selectedShift, selectedMachines, achievedNumber }) => {
  const [breakdownChecked, setBreakdownChecked] = useState(false);

  const handleBreakdownChange = (e) => {
    setBreakdownChecked(e.target.checked);
  };

  return (
    <div className="daily-view">
      <h2 className="view-title">Daily View</h2>
      <div className="view-details">
        <p className="detail-item">
          <span className="detail-label">Shift:</span> {selectedShift}
        </p>
        <p className="detail-item">
          <span className="detail-label">Machines:</span>{" "}
          {selectedMachines.join(", ")}
        </p>
        {breakdownChecked && (
          <div className="detail-item">
            <span className="detail-label">Breakdown:</span>{" "}
            {/* Here you can render the breakdown details */}
            <p>Breakdown details go here...</p>
          </div>
        )}
        <div className="detail-item">
          <span className="detail-label">Achieved:</span>{" "}
          <input
            type="number"
            value={achievedNumber}
            className="achieved-input"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="breakdown-checkbox">
          <input
            type="checkbox"
            id="breakdownCheckbox"
            checked={breakdownChecked}
            onChange={handleBreakdownChange}
          />
          <label htmlFor="breakdownCheckbox">Breakdown</label>
        </div>
      </div>
    </div>
  );
};

export default DailyView;
