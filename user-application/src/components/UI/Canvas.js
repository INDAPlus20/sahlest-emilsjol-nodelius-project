import React, { useRef, useEffect } from "react";

/*
This component draws a canvas using html canvas tag.
It's based on this article:  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#_=_
*/

const Canvas = (props) => {
  const canvasRef = useRef(null);
  let framesPerSecond = 5;
  let runAnimation = true;

  let arry = new Array(10);
  for (let index = 0; index < 10; index++) {
    arry[index] = Math.floor(Math.random()*500)
  }

  const drawRect = (ctx, height, pos) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(pos, 500, 100, -height);
    ctx.fill();
  };

  const drawArray = (ctx, frameCount, arr) => {
    for(const [i, barHeight] of arr.entries()){
      drawRect(ctx, (barHeight*frameCount)%500, i*50)
    }
  }

  
  //? Since we want the function to self trigger a render, we want to dissable the warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animation = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawArray(ctx, frameCount, arry)
    // drawRect(ctx, (frameCount * Math.random()) % 500, 100);
    // drawRect(ctx, frameCount % 500, 250);
  };

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
