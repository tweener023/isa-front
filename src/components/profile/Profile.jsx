import React from "react";
import "./profile.scss";

import { useState } from "react";
import "./profile.scss";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    city: "New York",
    zipCode: "10001",
    country: "USA",
    phoneNumber: "123-456-7890",
    jmbg: "123-45-6789",
    gender: "Male",
    job: "Software Developer",
    workplace: "Acme Inc",
    points: 0,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container" id="profile">
      <div className="leftAndRight">
        <div className="profile-column">
        <h1 className="headingProfile">Profile</h1>
          <div className="profile-field">
            <label className="labelStyle">Email:</label>
            {isEditing ? (
              <input type="email" value={profile.email} />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">First Name:</label>
            {isEditing ? (
              <input type="text" value={profile.firstName} />
            ) : (
              <p>{profile.firstName}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Last Name:</label>
            {isEditing ? (
              <input type="text" value={profile.lastName} />
            ) : (
              <p>{profile.lastName}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Address:</label>
            {isEditing ? (
              <input type="text" value={profile.address} />
            ) : (
              <p>{profile.address}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">City:</label>
            {isEditing ? (
              <input type="text" value={profile.city} />
            ) : (
              <p>{profile.city}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Zip Code:</label>
            {isEditing ? (
              <input type="text" value={profile.zipCode} />
            ) : (
              <p>{profile.zipCode}</p>
            )}
          </div>
        </div>
        <div className="profile-column">
          <div className="profile-field">
            <label className="labelStyle">Country:</label>
            {isEditing ? (
              <input type="text" value={profile.country} />
            ) : (
              <p>{profile.country}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Phone Number:</label>
            {isEditing ? (
              <input type="text" value={profile.phoneNumber} />
            ) : (
              <p>{profile.phoneNumber}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">JMBG:</label>
            {isEditing ? (
              <input type="text" value={profile.jmbg} />
            ) : (
              <p>{profile.jmbg}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Gender:</label>
            {isEditing ? (
              <input type="text" value={profile.gender} />
            ) : (
              <p>{profile.gender}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Job:</label>
            {isEditing ? (
              <input type="text" value={profile.job} />
            ) : (
              <p>{profile.job}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Workplace:</label>
            {isEditing ? (
              <input type="text" value={profile.workplace} />
            ) : (
              <p>{profile.workplace}</p>
            )}
          </div>
          <div className="profile-field">
            <label className="labelStyle">Points Collected:</label>
            {isEditing ? (
              <input type="number" value={profile.points} />
            ) : (
              <p>{profile.points}</p>
            )}
          </div>
        </div>
      </div>
      {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
    </div>
  );
}

export default Profile;
