import React, { useState } from 'react';
import { useFetch } from './hooks/useFetch';

import { MapComponent } from './components/Map';
import { Search } from './components/Search';
import { Drawer } from './components/Drawer';
function App() {
  const [geoloc, setGeoloc] = useState(null);
  const [selected, setSelected] = useState(null);
  const [data, loading] = useFetch(
    'https://api.smartable.ai/coronavirus/stats/global'
  );

  const [filter, setFilter] = useState('infected');
  const infected = {
    color: 'rgba(255, 65, 108, 1)'
  };

  const recovered = {
    color: 'rgba(97, 206, 129, 1)'
  };

  const deaths = {
    color: 'rgba(134, 67, 230, 1)'
  };

  const active = {
    color: 'rgba(40, 110, 255, 1)'
  };

  return (
    <div className="App">
      <Search
        filter={filter}
        data={!loading ? data : null}
        setGeoloc={setGeoloc}
        setFilter={setFilter}
        setSelected={setSelected}
      />
      <MapComponent
        setSelected={setSelected}
        geoloc={geoloc ? geoloc : null}
        filter={filter}
        colorScheme={
          filter === 'deaths'
            ? deaths
            : filter === 'recovered'
            ? recovered
            : filter === 'active'
            ? active
            : infected
        }
        data={!loading ? data : null}
      />
      <Drawer data={!loading ? data : null} selected={selected} />
    </div>
  );
}

export default App;
