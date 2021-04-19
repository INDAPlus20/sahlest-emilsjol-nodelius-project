import "./App.css";
import Nora from "./components/Nora";
import AudioListener from "./components/AudioListener";


function App() {
  return (
    <div className="App">
      <div className="test">
        <p> Clicka på Noras bubblor för att höra vad hon tänker!</p>
        <div className="norasTankar">
          <Nora noraSäger="Hej hej!" noraTänker="Hejdå" />
          <Nora
            noraSäger="Jag gillar Bananer!"
            noraTänker="mmmm, Bananer...."
          />
          <Nora
            noraSäger="Och solsken!"
            noraTänker="Varför vara inne när man kan vara ute!"
          />
          <Nora noraSäger="Men inte sallad!" noraTänker="Usch för grönsaker!" />
        </div>

        <div className="norasAudio">
          <p>Noraas Audio</p>
          <AudioListener/>
        </div>
      </div>
    </div>
  );
}

export default App;