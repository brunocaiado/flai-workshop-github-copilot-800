import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const baseUrl = process.env.REACT_APP_CODESPACE_NAME 
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        
        const apiUrl = `${baseUrl}/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed workouts data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading workouts...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  const getDifficultyBadge = (difficulty) => {
    const difficultyLower = (difficulty || '').toLowerCase();
    if (difficultyLower === 'easy') return 'difficulty-easy';
    if (difficultyLower === 'medium') return 'difficulty-medium';
    if (difficultyLower === 'hard') return 'difficulty-hard';
    return 'bg-secondary';
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 page-header">🥋 Training Protocols</h1>
      <div className="mb-4">
        <span className="badge bg-primary">Available Missions: {workouts.length}</span>
      </div>
      <div className="row">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-warning">No training protocols available</div>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id || workout._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">💪 {workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span><strong>⚡ Type:</strong></span>
                    <span className="badge bg-info">{workout.workout_type}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span><strong>⏱️ Duration:</strong></span>
                    <span className="badge bg-primary">{workout.duration} min</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span><strong>🎯 Difficulty:</strong></span>
                    <span className={`badge ${getDifficultyBadge(workout.difficulty_level)}`}>
                      {workout.difficulty_level}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;
