import React, { useRef, useEffect } from "react";

/*
This component draws a canvas using html canvas tag.
It's based on this article:  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#_=_
*/

const Canvas = (props) => {
  const canvasRef = useRef(null);
  let framesPerSecond = 5;
  let runAnimation = true;

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

  function generateMatrixFromJson(data) {
    //console.log(data);
    let mtrx = [];
    for (let i = 0; i < data.length; i++) {
      mtrx[i] = [];
      for (let j = 0; j < data[i].length; j++) {
        mtrx[i][j] = data[i][j];
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
    let matrixGotten = false;
    let frameCount = 0;
    let animationFrameId;
    //placeholder matris
    let mtrx = generateMatrix(10, 10, context);
    
    if (matrixGotten == false) {
      mtrx = getMatrixFromGoBackend();
      // varför är den här fel format???? den är response?????
      console.log("matris från getMatrixFromGoBackend(): ");
      console.log(mtrx);
      matrixGotten = true;
    }

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

  async function getMatrixFromGoBackend() {
    console.log("attempting to get matrix from back-end")
    let response = await fetch("http://localhost:8080/matrix");
    if (response.ok) {
      console.log("reponse ok");
      let data = await response.json();
      // den är rätt format här??? vad händer???
      console.log("generateMatrixFromJson(data) som returnas i getMatrixFromGoBackend():");
      console.log(generateMatrixFromJson(data));
      return generateMatrixFromJson(data);
    } else {
      alert("HTTP-Error: no response when fetching matrix");
    }
    return;
    /*fetch("http://localhost:8080/matrix", {
    })
    .then(response => response.json())
    .then(data => generateMatrixFromJson(data));*/
  }

  return <canvas ref={canvasRef} width="1200" height="650" {...props} />;
};

export default Canvas;