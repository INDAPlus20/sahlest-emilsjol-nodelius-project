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
        let x = 0;
        const sliceWidth = (width * 2.0)/frequencyData.length;

        context.lineWidth = 2;
        context.strokeStyle = 'blue';
        context.clearRect(0,0,width, height);
        context.beginPath();

        var n = frequencyData.length;

        console.log(frequencyData[0]);


        for (var i = 1; i<n/2 + 1; i++) {
            if (frequencyData[i]>0) {
                context.moveTo(x, height);
                context.lineTo(x, height-frequencyData[i]);            
            }
            x += (sliceWidth);
        }
        context.stroke();
    }

    componentDidUpdate() {
        this.draw();
      }

    render() {
        return <canvas width="1024" height="500" ref={this.canvas}/>
    }
}

export default AudioVisualiser;