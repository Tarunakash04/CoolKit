import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

function ClubWorkspace() {
  const { id } = useParams(); // club id from URL
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClub = async () => {
      try {
        const clubRef = doc(db, "clubs", id);
        const clubSnap = await getDoc(clubRef);
        if (clubSnap.exists()) {
          setClub({ id: clubSnap.id, ...clubSnap.data() });
        } else {
          alert("Club not found");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load club");
      } finally {
        setLoading(false);
      }
    };

    loadClub();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading club workspace...</p>;

  if (!club) return <p style={{ textAlign: "center", color: "red" }}>Club not found.</p>;

  return (
    <>
      <header className="dashboard-header">
        <h2>{club.name}</h2>
        <p>{club.description}</p>
      </header>

      <main className="clubs-section">
        <p>Future club workspace with events, members, tasks, and analytics.</p>
      </main>
    </>
  );
}

export default ClubWorkspace;