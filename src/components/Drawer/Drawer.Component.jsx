import React, { useState, useEffect } from 'react';
import './Drawer.Styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import 'moment/locale/he';
import { Line } from 'react-chartjs-2';
const Drawer = props => {
  const [drawerPosition, setDrawerPosition] = useState('80vh');
  const [touchStart, setTouchStart] = useState();
  const [touchPosition, setTouchPosition] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [selectedData, setSelectedData] = useState();
  const [movingClass, setMovingClass] = useState('transitioning');
  const [chartFilterIsOpen, setChartFilterIsOpen] = useState(false);
  const [chartClass, setChartClass] = useState('infected');
  const [compareFilterIsOpen, setCompareFilterIsOpen] = useState(false);
  const [compareClass, setCompareClass] = useState('none');
  const [dataset, setDataset] = useState();
  useEffect(() => {
    async function fetchUrl(selected) {
      setLoadingData(true);
      setDrawerPosition(document.documentElement.clientHeight * 0.8 + 'px');
      const response = await fetch(
        `https://api.smartable.ai/coronavirus/stats/${
          !selected ? 'global' : selected
        }`,
        {
          headers: { 'Subscription-Key': '09b965281531451ebbd7c97facdc2a7b' }
        }
      );
      const json = await response.json();
      setSelectedData(json);
      setDrawerPosition(document.documentElement.clientHeight * 0.65 + 'px');
      setLoadingData(false);
      setDataset();
      setChartClass('infected');
      setCompareClass('none');
    }
    fetchUrl(props.selected);
  }, [props.selected]);
  const colorInfected = {
    primary: 'rgba(255, 65, 108, 0.2)',
    secondary: 'rgba(255, 65, 108, 1)'
  };
  const colorDeaths = {
    primary: 'rgba(135, 66, 230, 0.2)',
    secondary: 'rgba(135, 66, 230, 1)'
  };
  const colorRecovered = {
    primary: 'rgba(96, 206, 129, 0.2)',
    secondary: 'rgba(96, 206, 129, 1)'
  };
  const colorActive = {
    primary: 'rgba(40, 110, 255, 0.2)',
    secondary: 'rgba(40, 110, 255, 1)'
  };
  const generateDataset = dataName => {
    const newData = {
      label: `${
        dataName === 'infected'
          ? 'סה״כ מקרים'
          : dataName === 'deaths'
          ? 'סה״כ נפטרו'
          : dataName === 'recovered'
          ? 'סה״כ החלימו'
          : dataName === 'active'
          ? 'סה״כ מקרים פעילים'
          : null
      }`,
      data: selectedData.stats.history.map(entry => {
        if (dataName === 'infected') {
          return entry.confirmed;
        }
        if (dataName === 'deaths') {
          return entry.deaths;
        }
        if (dataName === 'recovered') {
          return entry.recovered;
        }
        if (dataName === 'active') {
          return entry.confirmed - (entry.deaths + entry.recovered);
        } else {
          return null;
        }
      }),
      backgroundColor: [
        dataName === 'infected'
          ? colorInfected.primary
          : dataName === 'deaths'
          ? colorDeaths.primary
          : dataName === 'recovered'
          ? colorRecovered.primary
          : dataName === 'active'
          ? colorActive.primary
          : null
      ],
      borderColor: [
        dataName === 'infected'
          ? colorInfected.secondary
          : dataName === 'deaths'
          ? colorDeaths.secondary
          : dataName === 'recovered'
          ? colorRecovered.secondary
          : dataName === 'active'
          ? colorActive.secondary
          : null
      ],
      borderWidth: 2,
      pointRadius: 0,
      pointBackgroundColor:
        dataName === 'infected'
          ? colorInfected.primary
          : dataName === 'deaths'
          ? colorDeaths.primary
          : dataName === 'recovered'
          ? colorRecovered.primary
          : dataName === 'active'
          ? colorActive.primary
          : null,
      pointBorderColor:
        dataName === 'infected'
          ? colorInfected.secondary
          : dataName === 'deaths'
          ? colorDeaths.secondary
          : dataName === 'recovered'
          ? colorRecovered.secondary
          : dataName === 'active'
          ? colorActive.secondary
          : null,
      pointHitRadius: 20,
      pointHoverRadius: 10,
      pointHoverBorderColor:
        dataName === 'infected'
          ? colorInfected.secondary
          : dataName === 'deaths'
          ? colorDeaths.secondary
          : dataName === 'recovered'
          ? colorRecovered.secondary
          : dataName === 'active'
          ? colorActive.secondary
          : null,
      pointHoverBackgroundColor:
        dataName === 'infected'
          ? colorInfected.secondary
          : dataName === 'deaths'
          ? colorDeaths.secondary
          : dataName === 'recovered'
          ? colorRecovered.secondary
          : dataName === 'active'
          ? colorActive.secondary
          : null
    };
    return newData;
  };

  const chartFilterHandler = mod => {
    setChartClass(mod);
    if (!dataset || dataset.length === 1) {
      setDataset([generateDataset(mod)]);
    } else {
      setDataset([generateDataset(mod), dataset[1]]);
    }
  };

  const compareFilterHandler = mod => {
    setCompareClass(mod);
    if (!dataset) {
      setDataset([generateDataset('infected'), generateDataset(mod)]);
    } else {
      setDataset([dataset[0], generateDataset(mod)]);
    }
  };

  return (
    <div className={`drawer ${movingClass}`} style={{ top: drawerPosition }}>
      <div
        className="drawer-drag"
        onTouchStart={event => setTouchStart(event.touches[0].screenY)}
        onTouchMove={event => {
          setMovingClass('');
          if (
            event.touches[0].screenY > window.screen.height / 100 &&
            event.touches[0].screenY < window.screen.height * 0.8
          ) {
            setTouchPosition(event.touches[0].screenY);
            setDrawerPosition(event.touches[0].screenY + 'px');
          }
        }}
        onTouchEnd={event => {
          setMovingClass('transitioning');
          if (touchPosition < touchStart) {
            setDrawerPosition('1vh');
          } else {
            setDrawerPosition(
              document.documentElement.clientHeight * 0.8 + 'px'
            );
          }
          document.querySelector('.countryContent').scrollTop = 0;
        }}
      >
        <div className="bar"></div>
      </div>
      <div className="countryContent">
        {loadingData ? (
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="fa-spin loadingIcon"
          />
        ) : !loadingData && selectedData ? (
          <div className="contryContent-container">
            <div className="countryContent-header">
              <img
                className="flag"
                src={
                  selectedData.location.isoCode
                    ? `assets/flags/${selectedData.location.isoCode}.svg`
                    : selectedData.location.countryOrRegion
                    ? `assets/flags/${selectedData.location.countryOrRegion}.svg`
                    : `assets/flags/ZZ.svg`
                }
                alt=""
              />
              <div className="details">
                <h2 className="title">
                  {!selectedData.location.countryOrRegion
                    ? 'גלובלי'
                    : selectedData.location.countryOrRegion}
                </h2>
                {/* <p className="updated">Updated 30 minutes ago</p> */}
                <p className="updated">
                  <span>עדכון אחרון </span>
                  <Moment locale="he" fromNow>
                    {selectedData.updatedDateTime}
                  </Moment>
                </p>
              </div>
            </div>
            <div className="countryContent-stats">
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {selectedData.stats.totalConfirmedCases}
                  </div>
                  <div className="stat-el-name">סה״כ המקרים</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {selectedData.stats.newlyConfirmedCases}
                    {'+'}
                  </div>
                  <div className="stat-el-name">היום</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {selectedData.stats.totalDeaths}
                  </div>
                  <div className="stat-el-name">סה״כ נפטרו</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {selectedData.stats.newDeaths}
                    {'+'}
                  </div>
                  <div className="stat-el-name">היום</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {selectedData.stats.totalRecoveredCases}
                  </div>
                  <div className="stat-el-name">סה״כ החלימו</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {selectedData.stats.newlyRecoveredCases}
                    {'+'}
                  </div>
                  <div className="stat-el-name">היום</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {(
                      (selectedData.stats.totalDeaths /
                        selectedData.stats.totalConfirmedCases) *
                      100
                    ).toFixed(2)}
                    %
                  </div>
                  <div className="stat-el-name">אחוז תמותה</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {(
                      (selectedData.stats.totalRecoveredCases /
                        selectedData.stats.totalConfirmedCases) *
                      100
                    ).toFixed(2)}
                    %
                  </div>
                  <div className="stat-el-name">אחוז החלמה</div>
                </div>
              </div>
            </div>
            <div className="countryContent-graph">
              <div className="countryContent-graph-header">
                <div className="title-container">
                  <h2 className="title">
                    {!selectedData.location.countryOrRegion
                      ? 'גלובלי'
                      : selectedData.location.countryOrRegion}{' '}
                    | סה״כ מקרים
                  </h2>
                  <p className="updated">
                    <Moment locale="he" fromNow>
                      {selectedData.updatedDateTime}
                    </Moment>
                  </p>
                </div>
                <div className="filter-container">
                  <div
                    id="filter"
                    className={`filter ${chartClass}`}
                    onClick={() => setChartFilterIsOpen(!chartFilterIsOpen)}
                  >
                    <div
                      className="transparent"
                      onClick={() => {
                        console.log('trans');
                        setChartFilterIsOpen(!chartFilterIsOpen);
                        console.log(chartFilterIsOpen);
                      }}
                      style={{ display: chartFilterIsOpen ? 'block' : 'none' }}
                    ></div>
                    <div
                      className="filterOptions"
                      style={{ display: chartFilterIsOpen ? 'block' : 'none' }}
                    >
                      <div
                        className="filterOptions-option"
                        onClick={() => chartFilterHandler('infected')}
                      >
                        <div className="icon infected"></div>
                        <p className="title">סה״כ מקרים</p>
                      </div>
                      <div
                        className="filterOptions-option"
                        onClick={() => chartFilterHandler('deaths')}
                      >
                        <div className="icon deaths"></div>
                        <p className="title">סה״כ נפטרו</p>
                      </div>
                      <div
                        className="filterOptions-option"
                        onClick={() => chartFilterHandler('recovered')}
                      >
                        <div className="icon recovered"></div>
                        <p className="title">סה״כ החלימו</p>
                      </div>
                      <div
                        className="filterOptions-option"
                        onClick={() => chartFilterHandler('active')}
                      >
                        <div className="icon active"></div>
                        <p className="title">סה״כ מקרים פעילים</p>
                      </div>
                    </div>
                  </div>
                  <div
                    id="compare"
                    className={`filter ${compareClass}`}
                    onClick={() => {
                      setChartFilterIsOpen(false);
                      setCompareFilterIsOpen(!compareFilterIsOpen);
                    }}
                  >
                    <div
                      className="transparent"
                      onClick={() => {
                        console.log('trans');
                        setCompareFilterIsOpen(!compareFilterIsOpen);
                        console.log(compareFilterIsOpen);
                      }}
                      style={{
                        display: compareFilterIsOpen ? 'block' : 'none'
                      }}
                    ></div>
                    <div
                      className="filterOptions"
                      style={{
                        display: compareFilterIsOpen ? 'block' : 'none'
                      }}
                    >
                      <div
                        className="filterOptions-option"
                        onClick={() => compareFilterHandler('none')}
                      >
                        <div className="icon none"></div>
                        <p className="title">ריק</p>
                      </div>
                      <div
                        className="filterOptions-option"
                        onClick={() => compareFilterHandler('infected')}
                      >
                        <div className="icon infected"></div>
                        <p className="title">סה״כ מקרים</p>
                      </div>
                      <div
                        className="filterOptions-option"
                        onClick={() => compareFilterHandler('deaths')}
                      >
                        <div className="icon deaths"></div>
                        <p className="title">סה״כ נפטרו</p>
                      </div>
                      <div
                        className="filterOptions-option"
                        onClick={() => compareFilterHandler('recovered')}
                      >
                        <div className="icon recovered"></div>
                        <p className="title">סה״כ החלימו</p>
                      </div>
                      <div
                        className="filterOptions-option"
                        onClick={() => compareFilterHandler('active')}
                      >
                        <div className="icon active"></div>
                        <p className="title">סה״כ מקרים פעילים</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="countryContent-graph-container">
                <Line
                  className="chart"
                  data={{
                    labels: selectedData.stats.history.map(entry => {
                      return `${entry.date.split('T')[0].split('-')[2]}/${
                        entry.date.split('T')[0].split('-')[1]
                      }`;
                    }),
                    datasets: !dataset
                      ? [
                          {
                            label: 'Cases',
                            data: selectedData.stats.history.map(entry => {
                              return entry.confirmed;
                            }),
                            backgroundColor: ['rgba(255, 65, 108, 0.2)'],
                            borderColor: ['rgba(255, 65, 108, 1)'],
                            borderWidth: 2,
                            pointRadius: 0,
                            pointBackgroundColor: 'rgba(255, 65, 108, 0.2)',
                            pointBorderColor: 'rgba(255, 65, 108, 1)',
                            pointHitRadius: 20,
                            pointHoverRadius: 10,
                            pointHoverBorderColor: 'rgba(255, 65, 108, 1)',
                            pointHoverBackgroundColor: 'rgba(255, 65, 108, 1)'
                          }
                        ]
                      : dataset
                  }}
                  width={document.documentElement.clientWidth * 0.8}
                  height={document.documentElement.clientHeight * 0.6}
                  options={{
                    maintainAspectRatio: false,
                    legend: { display: false }
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Drawer;
