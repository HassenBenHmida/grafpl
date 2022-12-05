import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

import { Entry, Picks } from '../@types';
import Formation from '../components/Formation';
import { getOverallPoints, getPicksByFixture, getTeamByID } from '../graphql/util';

const HomePage = () => {
  const [team, setTeam] = useState<Entry>();
  const [teamPicks, setTeamPicks] = useState<Picks>();
  const [loading, setLoading] = useState(false);
  const [fixture, setFixture] = useState('');
  const [teamID, setTeamID] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (teamID && fixture) {
      setLoading(true);
      const team = await getTeamByID(teamID);
      const teamPicks = await getPicksByFixture(teamID, fixture);
      const teamPoints = await getOverallPoints(teamID, fixture);
      setTeamPicks(teamPicks);
      setTeam(team);
      setLoading(false);
      setTotalPoints(
        teamPoints.entry_history.total_points - teamPoints.entry_history.points,
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Did You Waste Your Time?</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="number"
          value={teamID}
          onChange={(e) => setTeamID(e.target.value)}
          placeholder="Team ID"
          required
        />
        <input
          type="number"
          value={fixture}
          placeholder="fixture"
          onChange={(e) => setFixture(e.target.value)}
          required
        />
        <button type="submit">Search Team</button>
      </form>
      {team && <strong>{team.name}</strong>}
      {teamPicks && (
        <div>
          Your Team Points would have been:
          <div className="total-points">{totalPoints}</div>
          Team Picks points since fixture {fixture}:
          <Formation team={teamPicks} fixture={fixture} handleTotal={setTotalPoints} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
