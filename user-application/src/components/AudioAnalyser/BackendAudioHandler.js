
async function BackendAudioHandler(dataTimeDomain) {


    const audio = await
        fetch("http://localhost:8080/handleAudio", {
          method: "POST",
          body: dataTimeDomain
        })
        .then(response => response.json())
        .then(data => data.list)
  
    return audio
}

export default BackendAudioHandler;