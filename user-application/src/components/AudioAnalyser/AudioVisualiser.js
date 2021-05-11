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
        const sliceWidth = (width * 2.0)/frequencyData.length;
        const upperLimit = 5;

        context.clearRect(0, 0, width, height);

        var n = frequencyData.length;

        console.log(frequencyData[0]);

        const drawRect = (ctx, pos, width, height, colour) => {
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.rect(pos, ctx.canvas.height, width, -height);
            ctx.fill();
          };

        for (var i = 1; i<n/2 + 1; i++) {
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
        return <canvas width="1024" height="500" ref={this.canvas}/>
    }
}

export default AudioVisualiser;