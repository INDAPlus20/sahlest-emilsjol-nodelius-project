import React, { useRef, useEffect } from "react";

/*
This component draws a canvas using html canvas tag.
It's based on this article:  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#_=_

*/
const Canvas = (props) => {
  const canvasRef = useRef(null);

  const drawRectangle = (ctx) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.fillRect(0, 0, 100, 100);
    ctx.fill();
  };

  const drawTriangle = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();
  };

  // Since we want the function to self trigger a render, we want to dissable the warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animation = (ctx, frameCount) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(250, 250, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      animation(context, frameCount);
      drawTriangle(context);
      drawRectangle(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animation]);

  return <canvas ref={canvasRef} width="500" height="500" {...props} />;
};

export default Canvas;
