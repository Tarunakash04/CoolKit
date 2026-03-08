import React from "react";

function ClubCard({ club }) {

  const handleClick = () => {
    localStorage.setItem("selectedClub", club.id);
    window.location.href = `/club/${club.id}`; // Navigate to club workspace
  };

  return (
    <div className="feature-card" onClick={handleClick}>
      <div className="feature-icon">🏛️</div>
      <h3>{club.name}</h3>
      <p>{club.description}</p>
    </div>
  );
}

export default ClubCard;