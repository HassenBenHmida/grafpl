import { useEffect, useState } from 'react';

import { Pick } from '../@types';
import { getPlayerLivePoints } from '../graphql/util';

type Props = {
  info: Pick;
  fixture: string | undefined;
};

function Player({ info, fixture }: Props) {
  const [points, setPoints] = useState<number>();

  const playerPoints = async () => {
    if (fixture) {
      const playerPoints = await getPlayerLivePoints(info.player.id, fixture);
      setPoints(parseInt(playerPoints.stats.total_points));
    }
  };

  useEffect(() => {
    playerPoints();
  }, []);

  return (
    <div>
      <div className="name">
        {info.player.web_name} {info.is_captain && <strong>C</strong>}
      </div>
      <div className="points">
        {points ? (info.is_captain ? points * 2 : points) : 'Loading'}
      </div>
    </div>
  );
}

export default Player;
