import { Route, Switch } from "react-router-dom";

import Navbar from "./components/UI/Navbar";

import HomeScreen from "./components/Pages/HomeScreen";
import AudioRecording from "./components/Pages/AudioRecording";
import FileAnalyzer from "./components/Pages/FileAnalyzer";
import Chatbot from "./components/Pages/Chatbot";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    getInfoFromGoServer()

  }, [])

  const getInfoFromGoServer = () => {
    console.log("we wqill now call the server 8080")
    fetch("http://localhost:8080/messages", {
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

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
          <Route path="/FileAnalyzer">
            <FileAnalyzer />
          </Route>
          <Route path="/Chatbot">
            <Chatbot />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
