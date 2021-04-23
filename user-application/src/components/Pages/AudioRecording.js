import React from 'react'
import AudioListener from '../AudioAnalyser/AudioListener'

function AudioRecording() {
    return (
        <div>
            <h1>Here you can analyse your voice!</h1>   
            <AudioListener/>
        </div>
    )
}

export default AudioRecording
