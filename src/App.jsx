import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useFetch } from './hooks/useFetch';
import { MapComponent } from './components/Map';
import { Search } from './components/Search';
import { Drawer } from './components/Drawer';
import { Menu } from './components/Menu';
import { MenuIcon } from './components/MenuIcon';
import { BrowserRouter } from 'react-router-dom';

function initializeReactGA() {
  ReactGA.initialize('UA-162938314-1');
  ReactGA.pageview('/');
}

function App() {
  initializeReactGA();
  const [geoloc, setGeoloc] = useState(null);
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState(false);
  const [data, loading] = useFetch(
    'https://api.smartable.ai/coronavirus/stats/global'
  );
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const [filter, setFilter] = useState('infected');
  const infected = {
    color: 'rgba(255, 65, 108, 1)',
  };

  const recovered = {
    color: 'rgba(97, 206, 129, 1)',
  };

  const deaths = {
    color: 'rgba(134, 67, 230, 1)',
  };

  const active = {
    color: 'rgba(40, 110, 255, 1)',
  };

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove('dark');
    }
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }, [theme]);

  return (
    <div className="App">
      <BrowserRouter>
        {document.body.clientWidth > 500 ? (
          <MenuIcon menu={menu} setMenu={setMenu} />
        ) : null}

        <Menu
          menu={menu}
          setMenu={setMenu}
          setTheme={setTheme}
          setSelected={setSelected}
        />
        <Search
          setMenu={setMenu}
          filter={filter}
          data={!loading ? data : null}
          setGeoloc={setGeoloc}
          setFilter={setFilter}
          setSelected={setSelected}
        />
        <MapComponent
          theme={theme}
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
        <Drawer selected={selected} />
      </BrowserRouter>
    </div>
  );
}

export default App;
