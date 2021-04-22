import { Route, Switch } from "react-router-dom";

import Test from "./components/Test";
import Navbar from "./components/UI/Navbar";

import AudioListener from "./components/AudioListener";
import EmilsTestKomponent from "./components/EmilsTestKomponent";
import Dropzone from "./components/Dropzone";
import HomeScreen from "./components/Pages/HomeScreen";
import AudioRecording from "./components/Pages/AudioRecording";

function App() {
  const EmilsTestFunktionHandler = () => {
    console.log("Emils testfunktion kördes");
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
          <Route path="/AudioRecording">
            <AudioRecording />
          </Route>
        </Switch>
      </main>
      {/* <Test/>
      <EmilsTestKomponent EmilsTestFunktion = {EmilsTestFunktionHandler}/>
      <AudioListener/>
      <Dropzone /> */}
    </div>
  );
}

export default App;
