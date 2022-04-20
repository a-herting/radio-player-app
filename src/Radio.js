import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./radio.jpg";

export default function Radio() {
  const [radioLanguage, setRadioLanguage] = useState("english");
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");

  // When the station filter or radioLanguage changes, useEffect is called to call the setupApi with the selected station filter and radio language. The data is set into the setStations state hook.
  useEffect(() => {
    setupApi(stationFilter, radioLanguage).then((data) => {
      setStations(data);
    });
  }, [stationFilter, radioLanguage]);

  //Async function used to fetch and return the correct radio stations on the app
  // based upon user input of stationFilter and radioLanguage.
  const setupApi = async (stationFilter, radioLanguage) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    // Querying the API by language and tag(genre/stationFilter)
    const stations = await api
      .searchStations({
        language: radioLanguage,
        tag: stationFilter,
        limit: 30,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  //Array of music genres a user can pick from.
  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
    "salsa",
  ];

  // Function used for setting the station image to a default image. This function is
  // called when onError is detected because some radio stations may not have an image.
  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className='radio'>
      {/* 'languageInput' input element receives a string input for language and sets the language via the setRadioLanguage(e.target.value) hook. */}
      <input
        type='string'
        className='languageInput'
        placeholder='Enter a language'
        onChange={(e) => {
          setRadioLanguage(e.target.value);
        }}
      />
      {/* 'Filters' div creates a span for each filter via the map() method. The span has an onClick attribute with a function, setting the filter via the setStationFilter(filter) hook. */}
      <div className='filters'>
        {filters.map((filter) => {
          return (
            <span
              className={stationFilter === filter ? "selected" : ""}
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </span>
          );
        })}
      </div>
      {/* 'Stations' div generates a div for each station that contains station name, station img, 
      and an audio player component via the map() method.  */}
      <div className='stations'>
        {stations &&
          stations.map((station, index) => {
            return (
              <div className='station' key={index}>
                <div className='stationName'>
                  <img
                    className='logo'
                    src={station.favicon}
                    alt='station logo'
                    onError={setDefaultSrc}
                  />
                  <div className='name'>{station.name}</div>
                </div>
                {/* (AudioPlayer) React H5 Audio Player was used because it's a customizable audio player component that provides consistent UI/UX on diff browsers that is mobile friendly. */}
                <AudioPlayer
                  className='player'
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout='stacked'
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
