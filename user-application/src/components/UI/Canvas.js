import React, { useRef, useEffect } from "react";

/*
This component draws a canvas using html canvas tag.
It's based on this article:  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#_=_
*/

const Canvas = (props) => {
  const canvasRef = useRef(null);
  let framesPerSecond = 20;
  let runAnimation = true;

  //Läste i en tutorial att det är bättre att skriva 'let arry = [];' än 'let arry = new Array(x);'
  //Tänk att den här matrisen är fft-datan från backend
  function generateMatrix(n, m, ctx) {
    let mtrx = [];
    for (let i = 0; i < n; i++) {
      mtrx[i] = [];
      for (let j = 0; j < m; j++) {
        mtrx[i][j] = Math.floor(Math.random()*(ctx.canvas.height));
      }
    }
    return mtrx;
  }

  const drawRect = (ctx, pos, width, height) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(pos, ctx.canvas.height, width, -height);
    ctx.fill();
  };

  const drawArray = (ctx, frameCount, mtrx) => {
    let currentRow = frameCount % mtrx.length;
    let width = ctx.canvas.width / mtrx[currentRow].length;
    for(const [i, barHeight] of mtrx[currentRow].entries()){
      drawRect(ctx, i*width, width, barHeight)
    }
  }
  
  //ogillar att mtrx måste tas som argument men behövs för att längden på staplarna ska följa canvas-storleken
  const animation = (ctx, frameCount, mtrx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawArray(ctx, frameCount, mtrx);
  };

  //körs varje gång animation, runAnimation eller framesPerSecond ändras
  //uppdaterar alltså sig själv vilket leder till animeringen
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    //matrisgenererandet behöver vara här för att följa storleken på canvas
    let mtrx = generateMatrix(100, 100, context);
    const render = () => {
      if (runAnimation) {
        setTimeout(() => {
          frameCount++;
          animation(context, frameCount, mtrx);
          animationFrameId = window.requestAnimationFrame(render);
        }, 1000 / framesPerSecond);
      }
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animation, runAnimation, framesPerSecond]);

  return <canvas ref={canvasRef} width="1200" height="650" {...props} />;
};

export default Canvas;
