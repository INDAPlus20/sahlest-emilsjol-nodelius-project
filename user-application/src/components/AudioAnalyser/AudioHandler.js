
function AudioHandler(dataTimeDomain) {

    var handledAudio;

    const sendAudioToGoServer = () => {
        fetch("http://localhost:8080/handleAudio", {
          method: "POST",
          body: dataTimeDomain
        })
        .then(response => response.json())
        .then(data => handledAudio = data)
    }

    sendAudioToGoServer();
  
    return handledAudio
}

export default AudioHandler;