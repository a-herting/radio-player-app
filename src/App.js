import "./App.scss";
import Radio from "./Radio";

function App() {
  return (
    <div className='App'>
      <h1>Radio Player</h1>
      <h2>
        Enter a language, pick a genre, choose a station, and start listening
      </h2>
      <Radio />
    </div>
  );
}

export default App;
