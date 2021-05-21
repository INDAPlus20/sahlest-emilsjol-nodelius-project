import React, { Component } from 'react';

import AudioVisualiser from './AudioVisualiser';
import BackendAudioHandler from './BackendAudioHandler';


class AudioAnalyser extends Component {
    constructor(props) {
        super(props);
        this.state = { frequencyData : null,
                        buttons : {sex : false,
                                fem : false,
                                fyra : false,
                                tre : false, 
                                tva : false,
                                ett : false}};
        this.analyse = this.analyse.bind(this);
        this.tone = 0;
    }


    componentDidMount() {
        // preparing datastream
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();

        // determines the frequency bin count (frequencybincount = fftsize/2), ie the number of samples collected
        // with 1024 datapoints we can determine frequencies ranging from 1-512.
        this.analyser.fftSize = 2048;

        // fs is sample rate (samples per second), n is number of samples collected (size of input array)
        // df is difference in hz between freq[i] and freq[i+1]
        this.fs = this.audioContext.sampleRate;
        this.n = this.analyser.frequencyBinCount;
        this.df = this.fs/this.n;

        // Array will include live data on the time domain spectrum.
        this.dataTimeDomain = new Uint8Array(this.n);

        // Get data
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.analyse);
    }

    async analyse() {

        // collecting timeDomain audiodata
        this.analyser.getByteTimeDomainData(this.dataTimeDomain);

        const handledAudio = await BackendAudioHandler(this.dataTimeDomain);

        this.setState({ frequencyData : handledAudio});
        if (this.rafId) {
            this.rafId = requestAnimationFrame(this.analyse);
        } else {
            cancelAnimationFrame(this.rafId);
            this.analyser.disconnect();
            this.source.disconnect();
        }
            
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
        this.analyser.disconnect();
        this.source.disconnect();
    }

    handleClick(tones) {

        switch(tones) {
            case 1:
                this.state.buttons.ett = true; this.state.buttons.tva = false; this.state.buttons.tre = false; this.state.buttons.fyra = false; this.state.buttons.fem = false; this.state.buttons.sex = false;
              break;
            case 2:
                this.state.buttons.ett = false; this.state.buttons.tva = true; this.state.buttons.tre = false; this.state.buttons.fyra = false; this.state.buttons.fem = false; this.state.buttons.sex = false;
              break;
            case 3:
                this.state.buttons.ett = false; this.state.buttons.tva = false; this.state.buttons.tre = true; this.state.buttons.fyra = false; this.state.buttons.fem = false; this.state.buttons.sex = false;
              break;
            case 4:
                this.state.buttons.ett = false; this.state.buttons.tva = false; this.state.buttons.tre = false; this.state.buttons.fyra = true; this.state.buttons.fem = false; this.state.buttons.sex = false;
              break;
            case 5:
                this.state.buttons.ett = false; this.state.buttons.tva = false; this.state.buttons.tre = false; this.state.buttons.fyra = false; this.state.buttons.fem = true; this.state.buttons.sex = false;
              break;
            case 6:
                this.state.buttons.ett = false; this.state.buttons.tva = false; this.state.buttons.tre = false; this.state.buttons.fyra = false; this.state.buttons.fem = false; this.state.buttons.sex = true;
              break;
            default:
                this.state.buttons.ett = false; this.state.buttons.tva = false; this.state.buttons.tre = false; this.state.buttons.fyra = false; this.state.buttons.fem = false; this.state.buttons.sex = false;
                break;
          }

        this.setState({tone : tones,
                    buttons : this.state.buttons})



    }


    render() {

        let classBtn_sex = this.state.buttons.sex ? "pressedtonebutton" : "tonebutton";
        let classBtn_fem = this.state.buttons.fem ? "pressedtonebutton" : "tonebutton";
        let classBtn_fyra = this.state.buttons.fyra ? "pressedtonebutton" : "tonebutton";
        let classBtn_tre = this.state.buttons.tre ? "pressedtonebutton" : "tonebutton";
        let classBtn_tva = this.state.buttons.tva ? "pressedtonebutton" : "tonebutton";
        let classBtn_ett = this.state.buttons.ett ? "pressedtonebutton" : "tonebutton";

        return (
            <div>
            <div className="tonebuttons">
                    <button className={classBtn_sex} id="e1"  onClick={() => this.handleClick(6)}>E - low</button>
                    <button className={classBtn_fem} id="b" onClick={() => this.handleClick(5)}>A</button>
                    <button className={classBtn_fyra} id="g" onClick={() => this.handleClick(4)}>D</button>
                    <button className={classBtn_tre} id="d" onClick={() => this.handleClick(3)}>G</button>
                    <button className={classBtn_tva}  id="a" onClick={() => this.handleClick(2)}>B</button>
                    <button className={classBtn_ett} id="e2" onClick={() => this.handleClick(1)}>E - high</button>
            </div>
            <AudioVisualiser frequencyData={this.state.frequencyData} tone = {this.state.tone} />
            </div>
        )
    }
}

export default AudioAnalyser;
