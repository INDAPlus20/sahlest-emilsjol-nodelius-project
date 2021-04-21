import React from 'react';

import Nora from './Nora';
import AudioListener from './AudioListener';

function Test() {
    return (
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
        </div>
    )
}

export default Test;
