import { useQuery } from '@apollo/client';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';

import { GET_PLAYER } from '../graphql/queries';
import { getOptions as players } from '../graphql/util';

function Compare() {
  const [selected, setSelected] = useState('Haaland');
  const { data, loading, error } = useQuery(GET_PLAYER, {
    variables: { name: selected },
  });

  if (loading) return <p>Loading ...</p>;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <AsyncSelect
        loadOptions={players}
        onChange={(opt: any) => setSelected(opt.value)}
        defaultOptions
      />
      {selected &&
        `${selected} have scored ${data.player.goals_scored} and assisted ${data.player.assists}`}
    </div>
  );
}

export default Compare;
