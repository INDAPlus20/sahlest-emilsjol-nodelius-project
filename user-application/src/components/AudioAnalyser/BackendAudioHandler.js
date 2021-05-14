
async function BackendAudioHandler(dataTimeDomain) {  
    return fetch("http://localhost:8080/handleAudio", {
      method: "POST",
      body: dataTimeDomain
    })
    .then(response => response.json())
    .then(data => data.list)
}

export default BackendAudioHandler;