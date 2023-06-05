import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";

export default function ComplaintsWaitingForResponse() {
  const { userId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const token = authService.getJwt();
  const user = authService.getCurrentUser();
  const userFirstName = user.firstName;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/complaints/waitingForResponse`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [userId]);

  return (
    <div className="fillingComplaint">
      <h1 style={{ marginBottom: "5rem" }}>Complaints Waiting For Response</h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {complaints.map((complaint) => (
          <li key={complaint.complaintId} style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "20px",
                background: "#4287f5",
                color: "#ffffff",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                Complaint {complaint.complaintId}
              </div>
              <div>{complaint.complaintText}</div>{" "}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
