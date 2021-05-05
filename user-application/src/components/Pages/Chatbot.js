import React, { useState } from 'react'


function Chatbot() {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      alert('You wrote: ' + value)
      setValue('')
  }

  return (
      <form onSubmit={handleSubmit}>
          <label>
              Write to buddy: <br/>
              <input
                type="text"
                value={value}
                onChange={e=>setValue(e.target.value)}
              />
          </label>
          <input
            type="submit"
            value="Submit" 
          /> <br/>
          <br/>

          <label>{value}</label>
      </form>
  );
}

export default Chatbot