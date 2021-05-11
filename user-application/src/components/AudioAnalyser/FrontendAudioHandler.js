import React, { Component } from 'react';

import AudioVisualiser from './AudioVisualiser';
import BackendAudioHandler from './BackendAudioHandler';


class AudioAnalyser extends Component {
    constructor(props) {
        super(props);
        this.state = { frequencyData : new Array(0) };
        this.analyse = this.analyse.bind(this);
    }


    componentDidMount() {
        // preparing datastream
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();

        // determines the frequency bin count (frequencybincount = fftsize/2), ie the number of samples collected
        this.analyser.fftSize = 16384/2;

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

        console.log(handledAudio)

        this.setState({ frequencyData : this.dataTimeDomain});
        this.rafId = requestAnimationFrame(this.analyse);
            
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    render() {
        return (
            <AudioVisualiser frequencyData={this.state.frequencyData} />
        )
    }
}

export default AudioAnalyser;
