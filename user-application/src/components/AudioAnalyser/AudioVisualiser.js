import React, { Component } from 'react';


class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    draw() {
        const {frequencyData} = this.props;
        const canvas1 = this.canvas.current;
        const height = canvas1.height;
        const width = canvas1.width;
        const context = canvas1.getContext('2d');
        const n = frequencyData.length;
        const sliceWidth = width/n;
        const upperLimit = 2500;

        context.clearRect(0, 0, width, height);

        const drawRect = (ctx, pos, w, h, colour) => {
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.rect(pos, ctx.canvas.height, w, -h);
            ctx.fill();
          };

        for (var i = 1; i<n + 1; i++) {
            if (frequencyData[i]>0) {
                if (frequencyData[i] >= upperLimit) {
                    drawRect(context, i * sliceWidth, sliceWidth, height, 'red');
                }
                else {
                    var barHeightPercentage = frequencyData[i] / upperLimit;
                    drawRect(context, i * sliceWidth, sliceWidth, barHeightPercentage * height, 'blue');
                }           
            }
        }
    }

    componentDidUpdate() {
        this.draw();
      }

    render() {
        return <canvas width="512" height="500" ref={this.canvas}/>
    }
}

export default AudioVisualiser;