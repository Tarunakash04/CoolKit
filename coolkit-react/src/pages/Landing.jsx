import React, { useEffect } from "react";
import { loginWithGoogle } from "../services/firebase";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard"); // Auto redirect if logged in
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      alert("Login failed. Check console.");
      console.error(err);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Checking login...</p>;

  return (
    <section className="landing">
      <div className="hero-container">
        <div className="hero-text">
          <h1>
            Manage Your Clubs <br />
            <span className="gradient-text">Like a Pro.</span>
          </h1>
          <p>
            Organize events, track members, manage finances, and collaborate —
            all in one powerful, simple dashboard.
          </p>
          <div className="hero-buttons">
            <button onClick={handleLogin} className="btn-primary">
              Login with Google
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
      </div>

      <section id="features-section" className="features">
        <div className="features-container">
          <h2 className="section-title">Everything You Need to Run a Club</h2>
          <p className="section-subtitle">
            Designed for modern student organizations and event teams.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Event Management</h3>
              <p>Create, schedule, and manage events with full visibility.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Member Tracking</h3>
              <p>Track participation, attendance, and engagement metrics.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Finance Tracking</h3>
              <p>Log expenses, manage budgets, and generate reports instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Task Assignment</h3>
              <p>Assign responsibilities and monitor progress in real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Visual insights into growth, performance, and engagement.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Role-Based Access</h3>
              <p>Admins, coordinators, volunteers — structured permissions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="audience-container">
          <h2 className="section-title">Who Is This For?</h2>
          <div className="audience-cards">
            <div className="audience-card">
              <div className="card-icon">🎓</div>
              <h3>Student Leaders</h3>
              <p>
                Organize events, assign tasks, track participation without
                spreadsheets.
              </p>
            </div>
            <div className="audience-card active">
              <div className="card-icon">🎤</div>
              <h3>Event Organizers</h3>
              <p>Plan events, manage teams, monitor budgets seamlessly.</p>
            </div>
            <div className="audience-card">
              <div className="card-icon">🏛️</div>
              <h3>College Admins</h3>
              <p>Oversee clubs, monitor reports, streamline approvals.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="minimal-footer">
        © 2026 · Crafted with precision by <strong>Tarun Akash</strong>
      </footer>
    </section>
  );
}

export default Landing;