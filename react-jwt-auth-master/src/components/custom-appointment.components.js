import React, { useState } from 'react';
import "../styles/customAppointment.scss";
import axios from 'axios';
import ErrorWindow from './error-window.component';
import AuthService from '../services/auth.service';



const CustomAppointmentForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [feedback, setFeedback] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDate = new Date(date);
    const selectedTime = new Date(`2000-01-01T${time}`);
  
    // Validate selected date
    const currentDate = new Date();
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
    const isCurrentOrPastDay = selectedDate < currentDate;
  
    // Validate selected time
    const selectedHour = selectedTime.getHours();
    const isTimeValid = selectedHour >= 9 && selectedHour <= 19;
  
    const currentUser = AuthService.getCurrentUser();
    const hasFilledQuestionnaire = currentUser.filledQuestionnaire;
  
    if (!hasFilledQuestionnaire) {
      setFeedback('Please fill out the questionnaire before making custom appointment. You can do it on Fill questionnaire tab.');
    } else if (isWeekend) {
      setFeedback('Please select a date that is not on a weekend.');
    } else if (isCurrentOrPastDay) {
      setFeedback('Please select a date that is not today or a day before.');
    } else if (!isTimeValid) {
      setFeedback('Please select a time between 09:00 and 19:00.');
    } else {
      setFeedback('');
      setIsLoading(true);
  
      // Make GET request to the endpoint
      axios
        .get('http://localhost:8080/api/test/facilities/all')
        .then((response) => {
          setFacilities(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  
  const isFormValid = date && time;

  return (
    <div className="custom-appointment-container">
      <h1 className="custom-appointment-header">Custom Appointment</h1>

      <div className="custom-appointment-form">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Set min date as current date
            />
          </div>

          <div className="form-field">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Loading...' : 'Find Facilities Available'}
          </button>
        </form>

        {feedback && <ErrorWindow message={feedback} />}

      </div>

      {facilities.length > 0 && (
        <div className="facility-container">
          <h2 className="facility-heading">Facilities:</h2>
          {facilities.map((facility) => (
            <div className="facility-card" key={facility.centerId}>
              <div className="facility-details">
                <p className="facility-name">Name: {facility.centerName}</p>
                <p className="facility-address">Address: {facility.centerAddress}</p>
                <p className="facility-grade">Grade: {facility.grade}</p>

              </div>
              <div className="facility-status">
                {facility.available ? (
                  <button className="create-appointment-button">Create Appointment</button>
                ) : (
                  <p className="facility-not-available">Facility is not available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomAppointmentForm;
