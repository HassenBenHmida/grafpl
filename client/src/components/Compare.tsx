import { useState } from 'react';

import Player from './Player';

function Compare() {
  const [name, setName] = useState('Haaland');

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {name ? <Player name={name} /> : null}
    </div>
  );
}

export default Compare;
