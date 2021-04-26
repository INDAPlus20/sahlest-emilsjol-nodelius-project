//! Måste alltid importera dina funktioner där du ska köra dem
import VisualizerDrawer from './VisualizerDrawer'


function FileVisualizer() {
  //! Du kan alltid köra dina funktioner innan du returnerar något som ska renderas på skärmen
  //! Detta blir då din constructor
  VisualizerDrawer()
    //skickar tillbaks lite text och en tom canvas och börjar även köra ritscriptet
    return (
        <div>
          <section className="container">
            <p> This text is from FileVisualizer.js</p>
            <canvas id = "visualizerCanvas" width = "500" height = "500"></canvas>
            {/* //! Skulle inte rekommendera att använda <script> taggar
            <script>
                VisualizerDrawer();
            </script> */}
            {/* //? ska du köra JS vid return så kör du det emellan måsvingar
            ex.
            {VisualizerDrawer} */}
            <p> This text is after the script tag to call VisualizerDrawer.js</p>
          </section>
        </div>
      );
}

export default FileVisualizer;