function FileVisualizer() {

    //skickar tillbaks lite text och en tom canvas och börjar även köra ritscriptet
    return (
        <div>
          <section className="container">
            <p> This text is from FileVisualizer.js</p>
            <canvas id = "visualizerCanvas" width = "600" height = "600"></canvas>
            <script async>
                VisualizerDrawer();
            </script>
          </section>
        </div>
      );
}

export default FileVisualizer;