import React, { useEffect, useState } from "react";
import { fetchUserClubs, createClub, joinClub, logout } from "../services/firebase";
import ClubCard from "../components/ClubCard";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  // Load clubs whenever user changes
  useEffect(() => {
    if (!loading && !user) navigate("/"); // redirect to landing if not logged in

    if (user) {
      loadClubs();
    }
  }, [user, loading, navigate]);

  const loadClubs = async () => {
    try {
      const userClubs = await fetchUserClubs(user.uid);
      setClubs(userClubs);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch clubs.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleCreateClub = async () => {
    const name = prompt("Enter club name:");
    if (!name) return alert("Club name required!");

    const description = prompt("Enter club description:");
    if (!description) return alert("Description required!");

    try {
      await createClub(name, description, user.uid);
      alert("Club created!");
      loadClubs();
    } catch (err) {
      console.error(err);
      alert("Failed to create club.");
    }
  };

  const handleJoinClub = async () => {
    const clubId = prompt("Enter Club ID to join:");
    if (!clubId) return alert("Club ID required!");

    try {
      await joinClub(clubId, user.uid);
      alert("Successfully joined club!");
      loadClubs();
    } catch (err) {
      console.error(err);
      alert("Failed to join club. Make sure the Club ID is correct.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading user info...</p>;

  return (
    <>
      <nav className="navbar">
        <div className="logo"><strong>CoolKit</strong></div>
        <div className="menu">
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <header className="dashboard-header">
        <h1>Welcome, {user?.name || "User"}!</h1>
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={handleCreateClub}>Create Club</button>
          <button className="btn-secondary" onClick={handleJoinClub}>Join Club</button>
        </div>
      </header>

      <main className="clubs-section">
        {clubs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            You haven’t joined any clubs yet. Use the buttons above to create or join one!
          </p>
        ) : (
          <div className="clubs-grid">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </main>

      <footer className="minimal-footer">
        © 2026 · Crafted with precision by <strong>Tarun Akash</strong>
      </footer>
    </>
  );
}

export default Dashboard;