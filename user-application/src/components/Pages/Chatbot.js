import React, { useState } from 'react'


function Chatbot() {
  const [input, setValue] = useState('');
  const [output, setSecondValue] = useState('');


  const handleSubmit = (userInput) => {

    fetch("http://localhost:8080/chatBot", {
      method: "POST",
      body: userInput
    })
    .then(response => response.json())
    .then(data => setSecondValue(data.text));

    setValue(userInput);
  }


  

  return (
      <form>
          <label>
              Write to buddy: <br/>
              <input
                type="text"
                value={input}
                onChange={e=>handleSubmit(e.target.value)}
              />
          </label>
          <input
            type="submit"
            value="Submit" 
          /> <br/>
          <br/>

          <label>{output}</label>
      </form>
  );
}

export default Chatbot