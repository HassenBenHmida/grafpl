import React from 'react';

import { Pick, Picks } from '../@types';
import Player from './Player';

type Props = {
  team: Picks;
};

const Formation = ({ team }: Props) => {
  const positions: Array<Pick[]> = [];
  // Sort by position and exclude benched players
  team.picks.slice(0, 11).forEach((pick) => {
    const i = pick.player.element_type - 1;
    positions[i] = positions[i] ? [...positions[i], pick] : [pick];
  });
  console.log(positions);

  return (
    <div className="formation">
      {positions.map((position, i) => (
        <div key={i} className="position">
          {position.map((pick) => (
            <Player key={pick.player.id} info={pick} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Formation;
