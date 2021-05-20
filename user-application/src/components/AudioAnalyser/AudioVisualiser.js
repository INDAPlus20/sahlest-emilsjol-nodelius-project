import React, { Component } from 'react';


class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.tone = this.props.tone;
    }


    freqOftone(tone) {
        var freq;

        switch(tone) {
            case 1:
               freq = 329.63;
              break;
            case 2:
              freq = 246.94;
              break;
            case 3:
              freq = 196.00;
              break;
            case 4:
              freq = 146.83;
              break;
            case 5:
              freq = 110.00;
              break;
            case 6:
              freq = 82.41;
              break;
            default:
                freq = 0
                break;
          }


        return freq;

    }

    draw() {
        const {frequencyData, tone} = this.props;
        const freq = this.freqOftone(tone);

        const canvas1 = this.canvas.current;
        const height = canvas1.height;
        const width = canvas1.width;
        const context = canvas1.getContext('2d');
        const n = frequencyData.length;
        const sliceWidth = width/n;
        const upperLimit = 10000;

        context.clearRect(0, 0, width, height);

        const drawRect = (ctx, pos, w, h, colour) => {
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.rect(pos, ctx.canvas.height, w, -h);
            ctx.fill();
          };

        drawRect(context, freq * sliceWidth, sliceWidth, height, 'green');
        drawRect(context, width - sliceWidth, sliceWidth, height, 'gray');   
        drawRect(context, 0, sliceWidth, height, 'gray');       

        for (var i = 1; i<n + 1; i++) {
            var barHeightPercentage = frequencyData[i] / upperLimit;
            var color;
            if (freq !== 0 && (freq < i + 10 && freq > i - 10)) {
                color = 'green';
            } else {
                color = 'blue';
            }
            drawRect(context, i * sliceWidth, sliceWidth, barHeightPercentage * height, color);       
        }
    }

    componentDidUpdate() {
        this.draw();
      }

    render() {
        return <canvas width="1024" height="500" ref={this.canvas}/>
    }
}

export default AudioVisualiser;