import { Pick } from '../@types';

type Props = {
  info: Pick;
};

function Player({ info }: Props) {
  return (
    <div>
      <div className="name">
        {info.player.web_name} {info.is_captain && <strong>C</strong>}
      </div>
      <div className="points">
        {info.is_captain ? info.player.event_points * 2 : info.player.event_points}
      </div>
    </div>
  );
}

export default Player;
