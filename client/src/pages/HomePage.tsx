import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

import { Entry, Picks } from '../@types';
import Formation from '../components/Formation';
import { getPicksByFixture, getTeamByID } from '../graphql/util';

const HomePage = () => {
  const [team, setTeam] = useState<Entry>();
  const [teamPicks, setTeamPicks] = useState<Picks>();
  const [loading, setLoading] = useState(false);
  const [fixture, setFixture] = useState('');
  const [teamID, setTeamID] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (teamID && fixture) {
      setLoading(true);
      const team = await getTeamByID(teamID);
      const teamPicks = await getPicksByFixture(teamID, fixture);
      setTeamPicks(teamPicks);
      setTeam(team);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Fantasy is a time waste</h1>
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
      {team && (
        <div>
          {team.name} team as of fixture {fixture}
        </div>
      )}
      {teamPicks && (
        <div>
          Team Picks:
          <Formation team={teamPicks} fixture={fixture} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
