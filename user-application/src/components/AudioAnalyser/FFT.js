import React, { Component } from 'react';
import { complex, exp, pi, pow, add, multiply, subtract, abs, sin } from 'mathjs';

import AudioVisualiser from './AudioVisualiser';


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

    analyse() {

        // collecting timeDomain audiodata
        this.analyser.getByteTimeDomainData(this.dataTimeDomain);

        // scalar depending on n (number of samples), for fft computation
        var w = exp(complex(0, -2*pi / this.n));
    
        // Own fft frequencies
        var frequencies = fft(this.dataTimeDomain, w);


        var systemFreq = new Float32Array(this.n);

        this.analyser.getFloatFrequencyData(systemFreq);

        for (var i = 0; i < this.n; i++) {
            var f = frequencies[i].re*frequencies[i].re + frequencies[i].im*frequencies[i].im;
            frequencies[i] = abs(f)/this.n;
        }

        console.log(frequencies);
    
        this.setState({ frequencyData : frequencies });
        this.rafId = requestAnimationFrame(this.analyse);
            
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    render() {
        return (
            <AudioVisualiser frequencyData={this.state.frequencyData} df={this.df} />
        )
    }
}


function dft(array, w) {
    var n_array = array.length
    var subFreqData = new Array(n_array);

    for (var i = 0; i < n_array; i++) {
        subFreqData[i] = new Array(n_array);

        for (var j = 0; j < n_array; j++) {
            var w_pow = pow(w, i*j);
            subFreqData[i][j] = w_pow;
        }

    }

    var f_hat = new Array(n_array);

    for (i = 0; i < n_array; i++) {
        var frequency = complex(0,0);

        for (j = 0; j< n_array; j++) {
            frequency = add(frequency, multiply(complex(array[j]), subFreqData[i][j]));
        }
        f_hat[i] = frequency;
    }
    return f_hat;

}

function fft(array, w) {
    var n_array = array.length;
        
    if (n_array == 1) {
        return array;
    } else {
        var array_odd = new Array(n_array/2);
        var array_even = new Array(n_array/2);

        for (var i = 0; i < n_array/2; i++) {
            array_odd[i] = array[2*i + 1];
            array_even[i] = array[2*i];
        }

        let w_pow_two = pow(w, 2);

        var even = fft(array_even, w_pow_two);
        var odd = fft(array_odd, w_pow_two);

        var subFreqData = new Array(n_array);
        for (i = 0; i < n_array/2; i++) {
            subFreqData[i] = add(even[i], multiply(pow(w, i), odd[i]));
            subFreqData[n_array/2 + i] = subtract(even[i], multiply(pow(w, i), odd[i]));
        }

        return subFreqData;
    }

}

export default AudioAnalyser;
