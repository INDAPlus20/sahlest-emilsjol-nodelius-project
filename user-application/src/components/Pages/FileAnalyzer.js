import React from "react";
import Dropzone from '../Dropzone/Dropzone';
import FileVisualizer from '../FileVisualizer/FileVisualizer';

function FileAnalyzer() {
  return (
    <div>

      <h1>Try and upload a file and see what happens</h1>
      <Dropzone />

      <h2>Visualizer</h2>
      <FileVisualizer />

    </div>
  );
}

export default FileAnalyzer;
