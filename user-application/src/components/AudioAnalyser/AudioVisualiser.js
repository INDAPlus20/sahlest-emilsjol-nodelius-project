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
        const df = this.props.df;
        const sliceWidth = (width * 2.0)/frequencyData.length;



        context.lineWidth = 1;
        context.strokeStyle = '#044599';
        context.clearRect(0,0,width, height);
        context.beginPath();

        var n = frequencyData.length;
        for (var i = 1; i<n/2; i++) {

            if (frequencyData[i] > 0) {
                context.moveTo(x, 255);
                context.lineTo(x, 255-frequencyData[i]);            
            }

            x += sliceWidth;

        }

        context.fillText("0 hz", 0, height);
        context.fillText("4096 hz", 760, height)
        context.moveTo(0, height);
        context.lineTo(width, height);
        context.stroke();



    }

    componentDidUpdate() {
        this.draw();
      }

    render() {
        return <canvas width="800" height="300" ref={this.canvas}/>
    }
}

export default AudioVisualiser;