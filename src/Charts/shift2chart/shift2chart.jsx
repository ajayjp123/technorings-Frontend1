import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import GaugeChart from "react-gauge-chart";
import "chartjs-plugin-datalabels";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import { shift2Data } from "../chart";


ChartJS.register(ArcElement, Tooltip, Legend);

function Shift2Chart({ selectedDay, OnDayChangeShift2 }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define colorRange outside of the useEffect hook
  const colorRange = [
    "#C8E6C9",
    "#A5D6A7",
    "#81C784",
    "#66BB6A",
    "#4CAF50",
    "#43A047",
    "#388E3C",
    "#2E7D32",
    "#1B5E20",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/webapp/shift_eff/2");
        const efficiencyData = response.data;

        // Extract shift efficiency data
        const shiftEfficiency = efficiencyData[0].shift_efficiency;

        // Set shift efficiency data to state
        setData(shiftEfficiency);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while data is being fetched
  }

  const angleValue = (data / 100) * Math.PI;

  return (
    <Link to="/chart">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div style={{ width: "100%", display: "inline-block" }}>
          <GaugeChart
            id="gauge-chart"
            nrOfLevels={30}
            colors={[
              "#FFCDD2", // Light red
              "#EF9A9A", // Medium light red
              "#E57373", // Medium red
              "#EF5350", // Medium dark red
              "#F44336", // Dark red
            ]}
            arcWidth={0.3}
            percent={angleValue / Math.PI} // Convert angle to a 0-1 scale
            textColor={"#FFFFFF"}
            needleColor="#ffffff"
            needleBaseColor="#ffffff"
            hideText
          />
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            bottom: "-0px", // Adjust the distance from the bottom of the gauge
            color: "#FFFFFF", // Text color
            fontSize: "18px", // Adjust text size as needed
          }}
        >
          {((angleValue / Math.PI) * 100).toFixed(2)}%
        </div>
      </div>
    </Link>
  );
}

export const fetchShiftsForDay2 = (day) => {
  let dataForSelectedDay = shift2Data;
  if (day !== "All Days") {
    dataForSelectedDay = shift2Data.filter((shift) => shift.day === day);
  }
  return dataForSelectedDay;
};

export default Shift2Chart;
