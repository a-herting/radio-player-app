# Radio-Player-App

This radio player app was made in React.js and it uses the [Radio Browser API.](https://www.npmjs.com/package/radio-browser-api). The user has the ability to input a language, select a genre, choose a radio station, and begin listening.

Component hierarchy is as follows: The app imports the radio component.

The Radio.js component contains a **useEffect( )** hook that focuses on any changes detected within the array of dependencies (**stationFilter**, **radioLanguage**).

The **useEffect( )** hook was used in order to control when we want the side effect logic (callback function) to run. In this situation, we want the callback function in **useEffect( )** to run only if **_stationFilter_** or **_radioLanguage_** have changed. If either of these have changed, then we will want to re-render the new data to the DOM.

The **setupApi ( )** asynchronous function is used to receive **stationFilter** and **radioLanguage** as parameters. An instance of the radio API is created (**'api'**). A variable called **'stations'** is created and set equal to the result of awaiting the query to the API. The method used to query the API is:

- **searchStations**({ - language: 'English ', - tag: 'jazz ', - limit: '30 ' })
  The language and tag properties are dynamically set by user input when the user enters a language and selects a genre of music. If no language is entered, the default value used is English.

The genres displayed on the app that the user will choose from is stored in the **'filters'** array. The **setDefaultSrc( )** function is used for setting the station image to a default image. This function is
called when the **_onError_** attribute on the image element for a station is detected, because some radio stations may not have an image.

We have a div with the class name 'radio' that contains the following:

- an input element for capturing the language input
- **'filters'** div that contains a map method for generating a span element for each genre displayed.
  - Each span element has an **_onClick_** event attribute that calls the **_setStationFilter (filter)_** state hook.
- **_'stations'_** div that contains a map method that is used to create the following for each station:
  - a div for the station
  - a div for the station name (that will also contain an image element for the station image)
  - a[React H5 Audio Player component](https://www.npmjs.com/package/react-h5-audio-player). The audio Player was used because it's a customizable audio player component that provides consistent UI/UX on diff browsers that is mobile friendly

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
