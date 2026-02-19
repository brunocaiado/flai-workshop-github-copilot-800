import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const baseUrl = process.env.REACT_APP_CODESPACE_NAME 
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        
        const apiUrl = `${baseUrl}/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed leaderboard data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading leaderboard...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-5">
      <h1 className="display-4 page-header">🏆 Hall of Heroes</h1>
      <div className="mb-3">
        <span className="badge bg-primary">Champions: {leaderboard.length}</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th style={{width: '100px'}}>Rank</th>
              <th>Hero</th>
              <th>Power Points</th>
              <th>Missions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="alert alert-info mb-0">No heroes ranked yet</div>
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, index) => {
                const rank = entry.rank || index + 1;
                let rankClass = 'rank-other';
                if (rank === 1) rankClass = 'rank-1';
                else if (rank === 2) rankClass = 'rank-2';
                else if (rank === 3) rankClass = 'rank-3';
                
                return (
                  <tr key={entry.id || entry._id || index}>
                    <td>
                      <span className={`rank-badge ${rankClass}`}>
                        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                      </span>
                    </td>
                    <td><strong>🦇 {entry.user_name || entry.user || 'N/A'}</strong></td>
                    <td>
                      <span className="badge bg-primary">⚡ {entry.total_points || 0} pts</span>
                    </td>
                    <td>
                      <span className="badge bg-info">🎯 {entry.total_activities || 0} missions</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
