import Test from "./components/Test";
import Header from "./components/Header";

import AudioListener from "./components/AudioListener";
import EmilsTestKomponent from "./components/EmilsTestKomponent";
import Dropzone from "./components/Dropzone"

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
      <Dropzone />
    </div>
  );
}

export default App;