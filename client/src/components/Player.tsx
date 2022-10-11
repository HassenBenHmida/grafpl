import { useQuery } from '@apollo/client';

import { GET_PLAYER } from '../graphql/queries';

type Props = {
  name: string;
};

function Player({ name }: Props) {
  const { loading, error, data } = useQuery(GET_PLAYER, {
    variables: { name },
  });

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      Hello {data.player.first_name} {data.player.second_name}
      <p>You have scored {data.player.goals_scored} goals so far</p>
    </div>
  );
}

export default Player;
