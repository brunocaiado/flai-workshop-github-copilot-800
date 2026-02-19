import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const baseUrl = process.env.REACT_APP_CODESPACE_NAME 
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        
        const apiUrl = `${baseUrl}/api/activities/`;
        console.log('Fetching activities from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Processed activities data:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading activities...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-5">
      <h1 className="display-4 page-header">⚡ Training Log</h1>
      <div className="mb-3">
        <span className="badge bg-primary">Total Sessions: {activities.length}</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Hero</th>
              <th>Training Type</th>
              <th>Duration (min)</th>
              <th>Energy Burned</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div className="alert alert-info mb-0">No training sessions found</div>
                </td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr key={activity.id || activity._id}>
                  <td><strong>🦇 {activity.user_name || activity.user || 'N/A'}</strong></td>
                  <td><span className="badge bg-info">💪 {activity.activity_type}</span></td>
                  <td>⏱️ {activity.duration}</td>
                  <td>
                    <span className="badge bg-warning">
                      🔥 {activity.calories_burned} cal
                    </span>
                  </td>
                  <td>📅 {new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
