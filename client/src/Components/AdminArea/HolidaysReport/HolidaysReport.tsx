import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import notifyService from "../../../Services/NotifyService";
import holidaysService from "../../../Services/HolidaysService";
import HolidayModel from "../../../Model/HolidayModel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  // responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Holidays",
    },
  },
};

let data = {
  labels: [""],
  datasets: [
    {
      label: "Dataset 1",
      data: [""],
      backgroundColor: "rgba(39, 22, 92, 0.5)",
    },
  ],
};

export default function HolidaysReport() {
  const [holidays, setHolidays] = useState<HolidayModel[]>([]);
  const [graphData, setGraphData] = useState(data);

  // Function to convert data to CSV format
  const convertToCSV = () => {
    const header = "Destination,Follower Count\n";
    const csvData = holidays.map((holiday) =>
      `${holiday.destination},${holiday.followerCount}`
    );
    return header + csvData.join("\n");
  };

  // Function to trigger CSV download
  const downloadCSV = () => {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "holidays.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Get holidays:
    holidaysService
      .getAllHolidays()
      .then((backendHolidays) => {
        setHolidays(backendHolidays);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(graphData));
    data.labels = holidays.map((holiday) => holiday.destination);
    data.datasets[0].data = holidays.map((holiday) => holiday.followerCount);
    setGraphData(data);
  }, [holidays]);

  return (
    <div style={{ width: "1500px", height: "1500px" }}>
      <Bar options={options} data={graphData} />
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
}
