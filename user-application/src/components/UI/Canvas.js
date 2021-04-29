import React, { useRef, useEffect } from "react";

/*
This component draws a canvas using html canvas tag.
It's based on this article:  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#_=_
*/

const Canvas = (props) => {
  const canvasRef = useRef(null);
  let framesPerSecond = 5;
  let runAnimation = true;

  //Läste i en tutorial att det är bättre att skriva 'let arry = [];' än 'let arry = new Array(x);'
  //Tänk att den här matrisen är fft-datan från backend
  let n = 100;
  let mtrx = [];
  for (let i = 0; i < n; i++) {
    mtrx[i] = [];
    for (let j = 0; j < n; j++) {
      mtrx[i][j] = Math.floor(Math.random()*500);
    }
  }

  const drawRect = (ctx, pos, width, height) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(pos, ctx.canvas.height, width, -height);
    ctx.fill();
  };

  const drawArray = (ctx, frameCount, mtrx) => {
    let currentRow = frameCount % n;
    let width = ctx.canvas.width / mtrx[currentRow].length;
    for(const [i, barHeight] of mtrx[currentRow].entries()){
      drawRect(ctx, i*width, width, barHeight)
    }
  }
  
  const animation = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawArray(ctx, frameCount, mtrx);
  };

  //körs varje gång animation, runAnimation eller framesPerSecond ändras
  //uppdaterar alltså sig själv -> animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      if (runAnimation) {
        setTimeout(() => {
          frameCount++;
          animation(context, frameCount);
          animationFrameId = window.requestAnimationFrame(render);
          
        }, 1000 / framesPerSecond);
      }
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animation, runAnimation, framesPerSecond]);

  return <canvas ref={canvasRef} width="500" height="500" {...props} />;
};

export default Canvas;
