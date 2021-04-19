
var stream = null;

function AudioListener(props) {

    async function getMicrophone() {
        stream = await navigator.mediaDevices.getUserMedia( {
            audio : true,
            video : false
        });
    }

    function stopMicrophone() {
        stream.getAudioTracks().forEach(track => track.stop());
        stream = null;
    }

    function toggleMicrophone() {
        if (stream) {
            stopMicrophone();
            document.querySelector("#micButton").innerText = "Start recording";
        } else {
            getMicrophone();
            document.querySelector("#micButton").innerText = "Stop recording";
        }
    }

    return (
        <div className="AudioListener">
            <button id="micButton" onClick={toggleMicrophone}>
                {stream ? 'Stop recording' : 'Start recording'}
            </button>
        </div>
    );

}

export default AudioListener;
