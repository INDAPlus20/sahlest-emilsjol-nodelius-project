import React, { Component } from 'react';


class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    
    draw() {
        const {frequencyData} = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0)/frequencyData.length;

        context.lineWidth = 2;
        context.strokeStyle = 'blue';
        context.clearRect(0,0,width, height);
        context.beginPath();

        for (const item of frequencyData) {
            context.moveTo(x, height);
            context.lineTo(x, height-item);
            x += sliceWidth;
        }
        context.stroke();
    }

    componentDidUpdate() {
        this.draw();
      }

    render() {
        return <canvas width="1200" height="500" ref={this.canvas}/>
    }
}

export default AudioVisualiser;