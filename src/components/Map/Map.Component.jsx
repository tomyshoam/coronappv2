import React, { useRef, useEffect } from 'react';
import { Map, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import './Map.Styles.scss';
function MapComponent(props) {
  let mapRef = useRef();
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
    }
    if (method === 'recovered') {
      const dataset = props.data.stats.breakdowns.slice();
      const recoveredSort = dataset.slice();
      recoveredSort.sort(function(a, b) {
        return b.totalRecoveredCases - a.totalRecoveredCases;
      });
    } else {
      const dataset = props.data.stats.breakdowns.slice();
      return dataset;
    }
  };

  /**
   *  Returns the radius of a given circle marker
   * @param {The factor based on which we calculate the radius} mod
   */
  const calculateRadius = mod => {
    return parseInt(mod, 10) === 0
      ? 0
      : parseInt(mod, 10) === 1
      ? 5
      : parseInt(mod, 10) === 2
      ? 6
      : parseInt(mod, 10) === 3
      ? 7
      : parseInt(mod, 10) <= 5
      ? 8
      : parseInt(mod, 10) <= 10
      ? 9
      : parseInt(mod, 10) <= 15
      ? 10
      : parseInt(mod, 10) <= 50
      ? 11
      : parseInt(mod, 10) <= 100
      ? 12
      : parseInt(mod, 10) <= 250
      ? 14
      : parseInt(mod, 10) <= 500
      ? 15
      : parseInt(mod, 10) <= 1000
      ? 16
      : parseInt(mod, 10) <= 1500
      ? 17
      : parseInt(mod, 10) <= 2000
      ? 21
      : parseInt(mod, 10) <= 4000
      ? 26
      : parseInt(mod, 10) <= 10000
      ? 30
      : parseInt(mod, 10) <= 30000
      ? 40
      : parseInt(mod, 10) <= 60000
      ? 50
      : 60;
  };

  useEffect(() => {
    if (mapRef && props.geoloc !== null) {
      mapRef.leafletElement.flyTo(props.geoloc);
    }
  }, [props.geoloc]);

  return (
    <Map
      ref={e => (mapRef = e)}
      id="map"
      zoom="5"
      center={[40, 40]}
      zoomControl={false}
      worldCopyJump={true}
    >
      <TileLayer url="https://api.mapbox.com/styles/v1/tomyshoam/ck7zbevsa0ror1iqwj807j3fx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidG9teXNob2FtIiwiYSI6ImNqemZrbnJwdTBjcG0zY2x0ZXo0NTJ0NjkifQ.pALbvMD8IjdTU0olF3INxQ" />
      {props.data
        ? sortData().map((country, index) =>
            (country.location.lat || country.location.long) &&
            country.totalConfirmedCases > 0 ? (
              <CircleMarker
                onclick={() => {
                  mapRef.leafletElement.setView(
                    [country.location.lat - 1, country.location.long],
                    7
                  );
                  props.setSelected(country.location.isoCode);
                }}
                radius={
                  props.filter === 'recovered'
                    ? calculateRadius(country.totalRecoveredCases)
                    : props.filter === 'deaths'
                    ? calculateRadius(country.totalDeaths)
                    : props.filter === 'active'
                    ? calculateRadius(country.totalConfirmedCases)
                    : calculateRadius(country.totalConfirmedCases)
                }
                fillColor={props.colorScheme.color}
                color={props.colorScheme.color}
                weight={2}
                key={index}
                center={[country.location.lat, country.location.long]}
              >
                <Tooltip>
                  <div className="tooltip">
                    <img
                      className="flag"
                      src={
                        country.location.isoCode
                          ? `assets/flags/${country.location.isoCode}.svg`
                          : `assets/flags/${country.location.countryOrRegion}.svg`
                      }
                      alt=""
                    />
                    <div className="content">
                      <div className="title">
                        <div>{country.location.countryOrRegion}</div>
                      </div>
                      <div className="newCases">
                        {country.newlyConfirmedCases}+
                      </div>
                      <p className="data">
                        סה״כ מקרים{' '}
                        <span className="amount">
                          {country.totalConfirmedCases}
                        </span>
                      </p>
                      {country.totalRecoveredCases > 0 ? (
                        <p className="data">
                          החלימו{' '}
                          <span className="amount">
                            {country.totalRecoveredCases}
                          </span>
                        </p>
                      ) : null}
                      {country.totalDeaths > 0 ? (
                        <p className="data">
                          נפטרו{' '}
                          <span className="amount">{country.totalDeaths}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ) : null
          )
        : null}
    </Map>
  );
}

export default MapComponent;
