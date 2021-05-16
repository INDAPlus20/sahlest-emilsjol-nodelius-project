import React, { useRef, useEffect, useState, } from "react";

/*
This component draws a canvas using html canvas tag.
It's based on this article:  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#_=_
*/

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const mtrxRef = useRef(0);
  let framesPerSecond = 5;
  // let runAnimation = false;
  const [runAnimation, runAnimationSetstate] = useState(false)

  function generateMatrixFromJson(data) {
    let mtrx = [];
    for (let i = 0; i < data.length; i++) {
      mtrx[i] = [];
      for (let j = 0; j < data[i].length; j++) {
        mtrx[i][j] = data[i][j];
      }
    }
    mtrxRef.current = mtrx;
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
      drawRect(ctx, i*width, width, barHeight * 650)
    }
  }
  
  //ogillar att mtrx måste tas som argument men behövs för att längden på staplarna ska följa canvas-storleken
  const animation = (ctx, frameCount, mtrx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawArray(ctx, frameCount, mtrx);
  };
  
  //sker en gång, notera tomma klamrarna i slutet
  useEffect(() => {

      fetch("http://localhost:8080/matrix")
        .then(response => response.json())
        .then(data => generateMatrixFromJson(data))
        .finally(runAnimationSetstate(true))
        .catch(error => alert(error));

  }, []); // <--

  //för säkerhets skull
  let mtrxTemp = [[1, 1], [1, 1]];
  mtrxRef.current = mtrxTemp;

  //körs varje gång animation, runAnimation eller framesPerSecond ändras
  //uppdaterar alltså sig själv vilket leder till animeringen
  //notera icke-tomma klamrar i slutet
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      if (runAnimation) {
        setTimeout(() => {
          frameCount++;
          animation(context, frameCount, mtrxRef.current);
          animationFrameId = window.requestAnimationFrame(render);
        }, 1000 / framesPerSecond);
      }
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animation, runAnimation, framesPerSecond]); // <-- icke-tomma klamrar

  return <canvas ref={canvasRef} width="1200" height="650" {...props} />;
};

export default Canvas;