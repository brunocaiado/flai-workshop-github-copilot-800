import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🦇 Gotham Fitness Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  🦸 Heroes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  🦸‍♂️ Squads
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  ⚡ Training
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  🏆 Hall of Fame
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  🤛 Protocols
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="container mt-5">
            <div className="jumbotron text-center">
              <h1 className="display-3 mb-4">🦇 Gotham Fitness Tracker</h1>
              <p className="lead mb-4\" style={{color: '#ffd700'}}>Train like a hero. Fight like a champion. Rise like the Dark Knight.</p>
              <hr className="my-4" style={{borderColor: 'rgba(255,215,0,0.5)'}} />
              <p className="mb-4" style={{color: '#e0e0e0'}}>Access your training dashboard:</p>
              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">🦸 Heroes Registry</h5>
                      <p className="card-text">Track all Gotham's finest warriors</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">🛡️ Justice Squads</h5>
                      <p className="card-text">Form and manage elite teams</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">⚡ Training Sessions</h5>
                      <p className="card-text">Log your combat training</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">🏆 Hall of Heroes</h5>
                      <p className="card-text">See who ranks among legends</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">🤛 Training Protocols</h5>
                      <p className="card-text">Batman-approved workout plans</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
