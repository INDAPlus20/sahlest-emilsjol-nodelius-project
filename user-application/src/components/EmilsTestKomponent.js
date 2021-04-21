import React from 'react'
import "./EmilsTestKomponent.css"

function EmilsTestKomponent(props) {

    return (
        <div className = "emils-test-komponent">
            <p onClick = {props.EmilsTestFunktion}>
                Hej, här är Emils testkomponent
            </p>
        </div>
    )
}

export default EmilsTestKomponent
