
function VisualizerDrawer() {
       //testa lite arrayer
       var arr = [];

       for (let i = 0; i < 100; i++) {
           arr.push(i);
       }
   
       console.log(arr.pop())

       //setup
       //var canvas = document.getElementById("visualizerCanvas");
       var c = (<canvas id = "visualizerCanvas" width = "500" height = "500"></canvas>);
       var ctx = c.getContext("2d");
       ctx.fillStyle = "FF0000";

       for (let i = 0; i < arr.length; i++) {
        ctx.fillRect(4*i, 0, 4, i)
       }

       console.log("VisualizerDrawer.js was called");

       return c;

}

export default VisualizerDrawer;