import React, { Component } from 'react';
import { complex, exp, pi, pow, add, multiply, subtract, abs } from 'mathjs';

import AudioVisualiser from './AudioVisualiser';


class AudioAnalyser extends Component {
    constructor(props) {
        super(props);
        this.state = { frequencyData : new Array(0) };
        this.analyse = this.analyse.bind(this);
    }


    componentDidMount() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.n = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.n);
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.analyse);
    }

    analyse() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        var sr = this.audioContext.sampleRate;
        console.log(sr);

        var w = exp(complex(0, -2*pi / this.n));

        var frequencies = fft(this.dataArray, w);

        var testArray = new Array(this.n)
        for (var i =0; i< this.n; i++) {
            var f = abs(frequencies[i]);
            if (f < 100) {
                testArray[i] = 0;

            } else {
                testArray[i] = f;
            }
        }




        this.setState({ frequencyData : testArray });
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
        
    if (n_array <= 4) {
        return dft(array, w)
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
            subFreqData[2*i] = add(even[i], multiply(pow(w, i), odd[i]));
            subFreqData[2*i+ 1] = subtract(even[i], multiply(pow(w, i), odd[i]));
        }

        return subFreqData;
    }

}

export default AudioAnalyser;
