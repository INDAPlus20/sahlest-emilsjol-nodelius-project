import React, { Component } from 'react';
import AudioHandler from './FrontendAudioHandler';

import './Audio.css'

class AudioListener extends Component {
    constructor(props) {
      super(props);
      this.state = {
        audio : null
      }
      this.toggleMicrophone = this.toggleMicrophone.bind(this);
      this.start = false;
      this.toneNow = 0;
    }


    async getMicrophone() {
        const setaudio = await navigator.mediaDevices.getUserMedia( {
            audio : true,
            video : false
        });
        this.start = true;
        this.setState({ audio : setaudio});
    }

    stopMicrophone() {
        this.state.audio.getAudioTracks().forEach(track => track.stop());
        this.setState({ audio : null });
        this.start = false;
    }

    toggleMicrophone() {
        if (this.start) {
            this.stopMicrophone();
        } else {
            this.getMicrophone();
        }
    }

  


    render() {
        return (
            <div>
                <div className="audioListener">
                    <button className="micbutton" id="micButton" onClick={this.toggleMicrophone}>
                        {this.start ? 'Stop recording' : 'Start recording'}
                    </button>
                </div>
                {this.start ? <AudioHandler audio = {this.state.audio}/> : null}
            </div>
        );    
    }
}

export default AudioListener;
