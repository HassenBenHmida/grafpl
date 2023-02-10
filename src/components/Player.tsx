import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Pick } from '../@types';
import { getPlayerTotalPoints } from '../graphql/util';

type Props = {
  info: Pick;
  fixture: string | undefined;
  handleTotal: React.Dispatch<React.SetStateAction<number>>;
};

function Player({ info, fixture, handleTotal }: Props) {
  const [points, setPoints] = useState<number>();

  const playerPoints = async () => {
    if (fixture) {
      // const lastGameweek = await getLastGameweek();
      // const playerPoints = await getPlayerLivePoints(info.player.id, fixture);
      const playerPoints = await getPlayerTotalPoints(
        info.player.id,
        fixture,
        info.player.total_points,
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
        {points ? (
          info.is_captain ? (
            points * 2
          ) : (
            points
          )
        ) : (
          <ThreeDots
            height="20"
            width="20"
            radius="9"
            color="rgb(55, 0, 60)"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}
      </div>
    </div>
  );
}

export default Player;
