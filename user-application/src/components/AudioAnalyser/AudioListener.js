import React, { Component } from 'react';
import AudioAnalyser from './FFT';

import './Audio.css'

class AudioListener extends Component {
    constructor(props) {
      super(props);
      this.state = {
        audio : null
      }
      this.toggleMicrophone = this.toggleMicrophone.bind(this)
    }

    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia( {
            audio : true,
            video : false
        });
        this.setState({ audio });
    }

    stopMicrophone() {
        this.state.audio.getAudioTracks().forEach(track => track.stop());
        this.setState({ audio : null });
    }

    toggleMicrophone() {
        if (this.state.audio) {
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
                        {this.state.audio ? 'Stop recording' : 'Start recording'}
                    </button>
                </div>
                {this.state.audio ? <AudioAnalyser audio= {this.state.audio}/> : ""}
            </div>
        );    
    }
}

export default AudioListener;
