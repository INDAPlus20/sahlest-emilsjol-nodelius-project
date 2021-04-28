import React, { useRef, useEffect } from "react";

/*
This component draws a canvas using html canvas tag.
It's based on this article:  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#_=_
*/

const Canvas = (props) => {
  const canvasRef = useRef(null);
  
  const drawArray = (ctx, arr) => {
    let max_y = ctx.canvas.height;
    let max_x = ctx.canvas.width;
    let width = max_x / arr.length;
    for (let i = 0; i < arr.length; i++) {
      ctx.rect(i * width, max_y - (arr[i] * 5), width, arr[i] * 5);
      ctx.fill();
    }
  };
  
  // Since we want the function to self trigger a render, we want to dissable the warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animation = (ctx, mtrx, row) => {
    drawArray(ctx, mtrx[row]);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let row = 0;
    let animationFrameId;

    const mtrx = [];
    for (let i = 0; i < 10; i++) {
      mtrx[i] = [];
      for (let j = 0; j < 10; j++) {
        mtrx[i][j] = Math.floor(Math.random() * 100);
      }
    }
    
    const render = () => {
      //börja om från början
      if (row >= mtrx.length) {
        row = 0;
      }

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      if (row >= mtrx.length) {
        return <canvas ref={canvasRef} width="500" height="500" {...props} />;
      }
      animation(context, mtrx, row);
      row++;
      //avkommentera för att starta animation, obs att cpu går till 100% och sidan hänger sig
      //kommentera, spara, och ändra URL:en till http://localhost:3000/ för att komma loss
      //animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animation]);

  return <canvas ref={canvasRef} width="500" height="500" {...props} />;
};

export default Canvas;
