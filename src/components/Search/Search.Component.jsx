import React, { useState, useEffect } from 'react';
import './Search.Styles.scss';
import { Menu } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope, faFilter } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import 'moment/locale/he';
const Search = props => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchField, setSearchField] = useState('');
  useEffect(() => {
    if (overlayOpen === true) {
      const overlaySearch = document.getElementById('overlaySearch');
      overlaySearch.click();
      overlaySearch.focus();
    } else {
      const overlaySearch = document.getElementById('overlaySearch');
      overlaySearch.value = '';
      setSearchField('');
    }
  }, [overlayOpen]);

  const sortData = method => {
    if (method === 'infected') {
      const dataset = props.data.stats.breakdowns.slice();
      const totalSort = dataset.slice();
      totalSort.sort(function(a, b) {
        return b.totalConfirmedCases - a.totalConfirmedCases;
      });
      return totalSort;
    }
    if (method === 'deaths') {
      const dataset = props.data.stats.breakdowns.slice();
      const deathSort = dataset.slice();
      deathSort.sort(function(a, b) {
        return b.totalDeaths - a.totalDeaths;
      });
      return deathSort;
    }
    if (method === 'recovered') {
      const dataset = props.data.stats.breakdowns.slice();
      const recoveredSort = dataset.slice();
      recoveredSort.sort(function(a, b) {
        return b.totalRecoveredCases - a.totalRecoveredCases;
      });
      return recoveredSort;
    } else {
      const dataset = props.data.stats.breakdowns.slice();
      return dataset;
    }
  };

  const filterData = data => {
    const filteredData = data.filter(country =>
      country.location.countryOrRegion
        .toLowerCase()
        .includes(searchField.toLowerCase())
    );
    return filteredData;
  };

  return (
    <div className="appbar">
      <div
        className="searchBar-overlay"
        style={overlayOpen ? { display: 'block' } : { display: 'none' }}
      >
        <div className="searchBar">
          <i className="menuIcon">
            <Menu size={24} />
          </i>
          <input
            onChange={event => setSearchField(event.target.value)}
            id="overlaySearch"
            onFocus={() => console.log('You focused the searchbar')}
            type="text"
            className="searchBar-input"
            placeholder="חיפוש לפי מדינה..."
          ></input>
          <div className="searchBar-filter" style={{ marginRight: '17%' }}>
            <FontAwesomeIcon
              icon={faFilter}
              className="searchBar-filter--icon"
              onClick={() => {
                setFilterOpen(!filterOpen);
              }}
            />
            <div
              className="filterOptions"
              style={filterOpen ? { display: 'block' } : { display: 'none' }}
            >
              <div
                className="filterItem infected"
                onClick={() => {
                  setFilterOpen(false);
                  props.setFilter('infected');
                }}
              >
                <div className="circle"></div>
                <div className="content">סה״כ מקרים</div>
              </div>
              <div
                className="filterItem recovered"
                onClick={() => {
                  setFilterOpen(false);
                  props.setFilter('recovered');
                }}
              >
                <div className="circle"></div>
                <div className="content">מחלימים</div>
              </div>
              <div
                className="filterItem deaths"
                onClick={() => {
                  setFilterOpen(false);
                  props.setFilter('deaths');
                }}
              >
                <div className="circle"></div>
                <div className="content">נפטרים</div>
              </div>
              <div
                className="filterItem total"
                onClick={() => {
                  setFilterOpen(false);
                  props.setFilter('total');
                }}
              >
                <div className="circle"></div>
                <div className="content">מקרים פעילים</div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay">
          {props.data
            ? filterData(sortData(props.filter)).map((country, index) => {
                return (
                  <div
                    className="searchItem"
                    key={index}
                    onClick={() => {
                      setOverlayOpen(false);
                      props.setSelected(country.location.isoCode);
                      props.setGeoloc([
                        country.location.lat,
                        country.location.long
                      ]);
                    }}
                  >
                    <div className="searchItem-index">{index + 1}</div>
                    <div className="searchItem-img">
                      <img
                        className="flag"
                        src={
                          country.location.isoCode
                            ? `assets/flags/${country.location.isoCode}.svg`
                            : `assets/flags/${country.location.countryOrRegion}.svg`
                        }
                        alt=""
                      />
                    </div>
                    <div className="searchItem-details">
                      <h3 className="searchItem-details--title">
                        {country.location.countryOrRegion}
                      </h3>
                      <p className="searchItem-details--update">
                        <Moment locale="he" fromNow>
                          {filterData(sortData(props.filter)).updatedDateTime}
                        </Moment>
                      </p>
                    </div>
                    <div className={`searchItem-data ${props.filter}`}>
                      {props.filter === 'infected'
                        ? country.totalConfirmedCases
                        : props.filter === 'deaths'
                        ? country.totalDeaths
                        : props.filter === 'recovered'
                        ? country.totalRecoveredCases
                        : country.totalConfirmedCases}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="searchBar">
        <i className="menuIcon">
          <Menu size={24} />
        </i>
        <div
          onClick={() => {
            setOverlayOpen(true);
            console.log(document.getElementById('overlaySearch'));
            const overlaySearch = document.getElementById('overlaySearch');
            overlaySearch.click();
            overlaySearch.focus();
          }}
          className="searchBar-input ref"
        >
          חיפוש לפי מדינה...
        </div>
        <div className="global-wrapper" onClick={() => props.setSelected(null)}>
          <FontAwesomeIcon icon={faGlobeEurope} className="searchBar-global" />
        </div>
        <div className="searchBar-filter">
          <FontAwesomeIcon
            icon={faFilter}
            className="searchBar-filter--icon"
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
          />
          <div
            className="filterOptions"
            style={filterOpen ? { display: 'block' } : { display: 'none' }}
          >
            <div
              className="filterItem infected"
              onClick={() => {
                setFilterOpen(false);
                props.setFilter('infected');
              }}
            >
              <div className="circle"></div>
              <div className="content">סה״כ מקרים</div>
            </div>
            <div
              className="filterItem recovered"
              onClick={() => {
                setFilterOpen(false);
                props.setFilter('recovered');
              }}
            >
              <div className="circle"></div>
              <div className="content">מחלימים</div>
            </div>
            <div
              className="filterItem deaths"
              onClick={() => {
                setFilterOpen(false);
                props.setFilter('deaths');
              }}
            >
              <div className="circle"></div>
              <div className="content">נפטרים</div>
            </div>
            <div
              className="filterItem total"
              onClick={() => {
                setFilterOpen(false);
                props.setFilter('total');
              }}
            >
              <div className="circle"></div>
              <div className="content">מקרים פעילים</div>
            </div>
          </div>
        </div>
        <img src="./assets/coffee-buy.png" alt="" className="coffee" />
      </div>
    </div>
  );
};

export default Search;
