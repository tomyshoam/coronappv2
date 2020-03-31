import React, { useState } from 'react';
import './Drawer.Styles.scss';
import { useFetch } from '../../hooks/useFetch';
const Drawer = props => {
  const [drawerPosition, setDrawerPosition] = useState('80vh');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [touchStart, setTouchStart] = useState();
  const [touchPosition, setTouchPosition] = useState();

  const [selectedData, loading] = useFetch(
    props.selected
      ? `https://api.smartable.ai/coronavirus/stats/${props.selected}`
      : null
  );

  return (
    <div className="drawer" style={{ top: drawerPosition }}>
      <div
        className="drawer-drag"
        onTouchStart={event => setTouchStart(event.touches[0].screenY)}
        onTouchMove={event => {
          if (
            event.touches[0].screenY > window.screen.height / 100 &&
            event.touches[0].screenY < window.screen.height * 0.8
          ) {
            setTouchPosition(event.touches[0].screenY);
            setDrawerPosition(event.touches[0].screenY + 'px');
          }
        }}
        onTouchEnd={event => {
          if (touchPosition < touchStart) {
            setDrawerPosition('1vh');
          } else {
            setDrawerPosition('80vh');
          }
          document.querySelector('.countryContent').scrollTop = 0;
        }}
      >
        <div className="bar"></div>
      </div>
      <div className="countryContent">
        {!loading && selectedData ? (
          <div className="contryContent-container">
            <div className="countryContent-header">
              <img
                className="flag"
                src={
                  selectedData.location.isoCode
                    ? `assets/flags/${selectedData.location.isoCode}.svg`
                    : `assets/flags/${selectedData.location.countryOrRegion}.svg`
                }
                alt=""
              />
              <div className="details">
                <h2 className="title">
                  {selectedData.location.countryOrRegion}
                </h2>
                <p className="updated">Updated 30 minutes ago</p>
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
          </div>
        ) : props.data ? (
          <div className="countryContent-container">
            <div className="countryContent-header">
              <img className="flag" src="assets/flags/ZZ.svg" alt="" />
              <div className="details">
                <h2 className="title">גלובאלי</h2>
                <p className="updated">Updated 30 minutes ago</p>
              </div>
            </div>
            <div className="countryContent-stats">
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {props.data.stats.totalConfirmedCases}
                  </div>
                  <div className="stat-el-name">סה״כ המקרים</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {props.data.stats.newlyConfirmedCases}
                    {'+'}
                  </div>
                  <div className="stat-el-name">היום</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {props.data.stats.totalDeaths}
                  </div>
                  <div className="stat-el-name">סה״כ נפטרו</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {props.data.stats.newDeaths}
                    {'+'}
                  </div>
                  <div className="stat-el-name">היום</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {props.data.stats.totalRecoveredCases}
                  </div>
                  <div className="stat-el-name">סה״כ החלימו</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {props.data.stats.newlyRecoveredCases}
                    {'+'}
                  </div>
                  <div className="stat-el-name">היום</div>
                </div>
              </div>
              <div className="stat-el">
                <div className="stat-el-inner">
                  <div className="stat-el-number">
                    {(
                      (props.data.stats.totalDeaths /
                        props.data.stats.totalConfirmedCases) *
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
                      (props.data.stats.totalRecoveredCases /
                        props.data.stats.totalConfirmedCases) *
                      100
                    ).toFixed(2)}
                    %
                  </div>
                  <div className="stat-el-name">אחוז החלמה</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Drawer;
