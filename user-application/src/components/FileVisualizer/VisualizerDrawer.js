
function VisualizerDrawer() {
       //testa lite arrayer
       var arr = [];

       for (let i = 0; i < 100; i++) {
           arr.push(i);
       }
   
       console.log(arr.pop())

       //setup
       var canvas = document.getElementById("visualizerCanvas");
       var ctx = canvas.getContext("2d");
       ctx.fillStyle = "FF0000";

       for (let i = 0; i < arr.length; i++) {
        ctx.fillRect(i, 0, 4, i)
       }

}

export default VisualizerDrawer;