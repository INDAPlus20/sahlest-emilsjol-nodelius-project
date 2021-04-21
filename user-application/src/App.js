import Test from "./components/Test";
import Header from "./components/Header";

import AudioListener from "./components/AudioListener";
import EmilsTestKomponent from "./components/EmilsTestKomponent";

function App() {

  const EmilsTestFunktionHandler = () => {
    console.log("Emils testfunktion kördes")
  }

  return (
    <div className="App">
      <Header/>
      <Test/>
      <EmilsTestKomponent EmilsTestFunktion = {EmilsTestFunktionHandler}/>
      <AudioListener/>
    </div>
  );
}

export default App;