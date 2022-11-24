import 'react-datepicker/dist/react-datepicker.css';

import React, { useRef, useState } from 'react';

import { Entry, Picks } from '../@types';
import Formation from '../components/Formation';
import { getPicksByFixture, getTeamByID } from '../graphql/util';

const HomePage = () => {
  const [team, setTeam] = useState<Entry>();
  const [teamPicks, setTeamPicks] = useState<Picks>();
  const [loading, setLoading] = useState(false);
  const fixtureRef = useRef<HTMLInputElement>(null);
  const teamRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teamID = teamRef.current?.value;
    const fixture = fixtureRef.current?.value;
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
        <input ref={teamRef} type="number" placeholder="Team ID" required />
        <input ref={fixtureRef} type="number" placeholder="fixture" required />
        <button type="submit">Search Team</button>
      </form>
      {team && (
        <div>
          {team.name} team as of fixture {fixtureRef.current?.value}
        </div>
      )}
      {teamPicks && (
        <div>
          Team Picks:
          <Formation team={teamPicks} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
