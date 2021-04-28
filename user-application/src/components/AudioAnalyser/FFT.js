import React, { Component } from 'react';
import { complex, exp, pi, pow } from 'mathjs';

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

        var w = exp(complex(0, -2*pi / this.n))
        this.fft(this.dataArray, w);


        this.setState({ frequencyData : this.dataArray });
        this.rafId = requestAnimationFrame(this.analyse);
    }


    dft(array, w) {
        var n_array = array.length

        var subFreqData = new Array(n_array);

        for (var i = 0; i < n_array; i++) {
            subFreqData.push(new Array());

            for (var j = 0; j < n_array; j++) {
                var w_pow = pow(w, i*j);
                subFreqData[i].push(w_pow);
            }
        }

        var f_hat = new Array(n_array);

        for (i = 0; i < n_array; i++) {
            var frequency;

            for (j = 0; j< n_array; j++) {
                frequency += array[j] * subFreqData[i][j];
            }
            f_hat.push(frequency);
        }

        return f_hat;

    }


    fft(array, w) {
        var n_array = array.length;
        
        if (n_array <= 256) {
            return this.dft(array)
        } else {
            var array_odd = new Array(n_array/2);
            var array_even = new Array(n_array/2);

            for (var i = 0; i < n_array/2; i++) {
                array_odd.push(array[2*i + 1]);
                array_even.push(array[2*i]);
            }

            var w_pow_two = w*w;
            console.log("this is thing: ", w_pow_two);

            var even = this.fft(array_even, w_pow_two);
            var odd = this.fft(array_odd, w_pow_two);

            var subFreqData = new Array(n_array);
            for (i = 0; i < n_array/2; i++) {
                subFreqData[2*i] = even[i] + pow(w, i) * odd[i];
                subFreqData[2*i+ 1] = even[i] - pow(w, i) * even[i];
            }

            return subFreqData;
        }
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
