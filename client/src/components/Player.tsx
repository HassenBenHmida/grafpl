import { useEffect, useState } from 'react';

import { Pick } from '../@types';
import { getLastGameweek, getPlayerTotalPoints } from '../graphql/util';

type Props = {
  info: Pick;
  fixture: string | undefined;
  handleTotal: React.Dispatch<React.SetStateAction<number>>;
};

function Player({ info, fixture, handleTotal }: Props) {
  const [points, setPoints] = useState<number>();

  const playerPoints = async () => {
    if (fixture) {
      const lastGameweek = await getLastGameweek();
      // const playerPoints = await getPlayerLivePoints(info.player.id, fixture);
      const playerPoints = await getPlayerTotalPoints(
        info.player.id,
        fixture,
        lastGameweek,
      );
      setPoints(playerPoints);
      handleTotal((prev) => prev + playerPoints);
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
