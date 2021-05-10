
function AudioHandler(dataTimeDomain) {

    const sendAudioToGoServer = () => {
        fetch("http://localhost:8080/send", {
          method : 'POST',
          body: dataTimeDomain
        })
        .then(response => response.json())
        .then(data => {

            var thing = JSON.stringify(data);
            
            

            console.log("Request succeded with JSON respons: ", thing)

        })
    }

    sendAudioToGoServer();
    

    return dataTimeDomain
}

export default AudioHandler;