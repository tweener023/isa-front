import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Chart, registerables } from "chart.js";
import "../styles/analytics.css";

const AnalyticsComponent = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser.token;

        const facilityResponse = await UserService.getFacilityByMedic(
          currentUser.id,
          token
        );
        const center = facilityResponse.data;

        const analyticsResponse = await UserService.getAnalytics(
          center.centerId
        );
        const data = analyticsResponse.data;

        setAnalyticsData(data);

        Chart.register(...registerables);

        // Delay the execution of graph creation functions
        setTimeout(() => {
          if (data) {
            createAppointmentsGraph(data);
            createSuppliesGraph(data);
            createEquipmentGraph(data);
          }
        }, 100); // Adjust the delay as needed
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    }

    fetchData();
  }, []);

  const createAppointmentsGraph = (data) => {
    const ctx = document.getElementById("appointmentsGraph").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Last Month", "Last Year", "Total"],
        datasets: [
          {
            label: "Appointments",
            data: [
              data.appointmentsLastMonth,
              data.appointmentsLastYear,
              data.appointmentsTotal,
            ],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(
                data.appointmentsLastMonth,
                data.appointmentsLastYear,
                data.appointmentsTotal
              ) + 10, // Adjust the value here as needed
          },
        },
      },
    });
  };

  const createSuppliesGraph = (data) => {
    const ctx = document.getElementById("suppliesGraph").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Last Month", "Last Year", "Total"],
        datasets: [
          {
            label: "Supplies",
            data: [
              data.suppliesLastMonth,
              data.suppliesLastYear,
              data.suppliesTotal,
            ],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(
                data.suppliesLastMonth,
                data.suppliesLastYear,
                data.suppliesTotal
              ) + 10, // Adjust the value here as needed
          },
        },
      },
    });
  };

  const createEquipmentGraph = (data) => {
    const ctx = document.getElementById("equipmentGraph").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Last Month", "Last Year", "Total"],
        datasets: [
          {
            label: "Equipment",
            data: [
              data.equipmentLastMonth,
              data.equipmentLastYear,
              data.equipmentTotal,
            ],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(
                data.equipmentLastMonth,
                data.equipmentLastYear,
                data.equipmentTotal
              ) + 10, // Adjust the value here as needed
          },
        },
      },
    });
  };

  if (!analyticsData) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="heading">Analytics</h2>
      <div className="-info-container">
      <p>
        <span className="bold-label">Average Grade:</span> {analyticsData.averageGrade}
      </p>
      <p>
        <span className="bold-label">Appointments Last Month:</span> {analyticsData.appointmentsLastMonth}
      </p>
      <p>
        <span className="bold-label">Appointments Last Year:</span> {analyticsData.appointmentsLastYear}
      </p>
      <p>
        <span className="bold-label">Appointments Total:</span> {analyticsData.appointmentsTotal}
      </p>
      <p>
        <span className="bold-label">Supplies Last Month:</span> {analyticsData.suppliesLastMonth}
      </p>
      <p>
        <span className="bold-label">Supplies Last Year:</span> {analyticsData.suppliesLastYear}
      </p>
      <p>
        <span className="bold-label">Supplies Total:</span> {analyticsData.suppliesTotal}
      </p>
      <p>
        <span className="bold-label">Equipment Last Month:</span> {analyticsData.equipmentLastMonth}
      </p>
      <p>
        <span className="bold-label">Equipment Last Year:</span> {analyticsData.equipmentLastYear}
      </p>
      <p>
        <span className="bold-label">Equipment Total:</span> {analyticsData.equipmentTotal}
      </p>
      </div>
      <div className="graph-container">
        <h4 className="appointmentsHeader">Appointments</h4>
        <canvas id="appointmentsGraph" width="400" height="150"></canvas>
      </div>

      <div className="graph-container">
        <h4 className="appointmentsHeader">Supplies</h4>
        <canvas id="suppliesGraph" width="400" height="150"></canvas>
      </div>

      <div className="graph-container">
        <h4 className="appointmentsHeader">Equipment</h4>
        <canvas id="equipmentGraph" width="400" height="150"></canvas>
      </div>
    </div>
  );
};

export default AnalyticsComponent;
