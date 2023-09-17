import React, { useState } from "react";
import {Chart} from "react-chartjs-2";
import useTitle from "../../../Services/useTitle";

function HolidaysReport(): JSX.Element {
    useTitle("HolidayApp | holiday-report");

    // Sample data (replace with your actual data)
    const holidaysData = {
      labels: ["Holiday 1", "Holiday 2", "Holiday 3", "Holiday 4", "Holiday 5"],
      datasets: [
        {
          label: "Number of Followers",
          data: [100, 200, 150, 300, 250], // Replace with your follower counts
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Followers",
          },
        },
        x: {
          title: {
            display: true,
            text: "Holidays",
          },
        },
      },
    };
  
    return (
      <div>
        <h1>Holidays Report</h1>
        <div style={{ height: "400px", width: "600px" }}>
          <Chart type="bar" data={holidaysData} options={options} />
        </div>
      </div>
    );
  }
  
export default HolidaysReport;
