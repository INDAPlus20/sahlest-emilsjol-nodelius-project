function FileVisualizer() {

    //skickar tillbaks lite text och en tom canvas och börjar även köra ritscriptet
    return (
        <div>
          <section className="container">
            <p> This text is from FileVisualizer.js</p>
            <canvas id = "visualizerCanvas" width = "500" height = "500"></canvas>
            <script>
                VisualizerDrawer();
            </script>
            <p> This text is after the script tag to call VisualizerDrawer.js</p>
          </section>
        </div>
      );
}

export default FileVisualizer;