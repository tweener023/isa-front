import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";
import "../styles/complaintsRespondedTo.scss";

export default function ComplaintsRespondedTo() {
  const { userId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const token = authService.getJwt();
  const user = authService.getCurrentUser();
  const userFirstName = user.firstName;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/complaints/respondedTo`,
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
      <h1 style={{ marginBottom: "5rem" }}>
        Complaints Sent by {userFirstName}
      </h1>
      <div className="complaintsContainer">
        {complaints.map((complaint) => (
          <div key={complaint.complaintId} className="complaint">
            <div className="complaintHeader">Complaint</div>
            <div className="complaintText">{complaint.complaintText}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
