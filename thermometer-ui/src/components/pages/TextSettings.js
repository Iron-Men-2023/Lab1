import React, {useState} from 'react';
import {use} from "express/lib/router";

function TextSettings(props) {

    const [text,setText] = useState(
        {
            recipient: '+13194001054',
            textMessage: 'test'

    })
    function sendText(){
        console.log(text)
        // pass variables within the  query string
        console.log(`https://mainthermoserver.herokuapp.com/send-text?recipient=${text.recipient}&textmessage=${text.textMessage}`)
        fetch(`https://mainthermoserver.herokuapp.com/send-text?recipient=${text.recipient}&textMessage=${text.textMessage}`)
            .catch(err => console.error(err))
    }
    return (
        <div className="App">

            <div style={{ marginTop: 10 }} >
                <h2> Send Text Message </h2>

                <button onClick={sendText}> Send Text </button>
            </div>
        </div>
    );
}

export default TextSettings;