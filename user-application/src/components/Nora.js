import React from 'react';

function Nora(props) {
  function callNora() {
    console.log(props.noraTänker + "!!!!!!!!!!!!!!!");
  }

  return (
    <div className="Nora" onClick={callNora}>
      {" "}
      {props.noraSäger}
    </div>
  );
}

export default Nora;
