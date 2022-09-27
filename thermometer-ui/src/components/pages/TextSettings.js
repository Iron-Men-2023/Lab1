import React, {useEffect, useRef, useState} from 'react';
import "./TextSettings.css"
import {onValue, ref} from "firebase/database";
import {database} from "../../firebase";
function TextSettings(props)
{
    const [text,setText] = useState(
        {
            recipient: '+13194001054',
            textMessage: 'jj'

        })
    const [dbData, setDbData] = useState({});
    const [minValue, setMinValue] = useState(null)
    const [maxValue, setMaxValue] = useState(null)
    const [minText, setMinText] = useState(null);
    const [maxText, setMaxText] = useState(null);
    const [server, setServer] = useState(0);
    const [outOfBounds, setOutOfBounds] = useState(false)

    const minValueRef = useRef(0);
    const minTextRef = useRef("");
    const maxValueRef = useRef(20);
    const maxTextRef = useRef("a");
    const outOfBoundsRef = useRef(false)

    minValueRef.current = minValue;
    minTextRef.current = minText;
    maxValueRef.current = maxValue;
    maxTextRef.current = maxText;
    outOfBoundsRef.current = outOfBounds;
    useEffect(() => {
        const firebaseRef= ref(database,"Lab1");
        console.log("hiiii")
        return onValue(firebaseRef, (snapshot) => {
            setDbData(snapshot.val());
            const {Is_On, Temperature} = snapshot.val()
            console.log(maxValueRef.current,parseInt(Temperature),maxValue.current,!outOfBoundsRef.current)
            if(Is_On )
            {
                if(minValueRef.current && parseInt(Temperature)<minValueRef.current && !outOfBoundsRef.current)
                {
                    sendText(minTextRef.current)
                    console.log("TOOO SMAALLL")
                    setOutOfBounds(true)
                    outOfBoundsRef.current=true
                }
                else if(maxValueRef.current && parseInt(Temperature)>maxValueRef.current && !outOfBoundsRef.current)
                {
                    console.log("TOO BIG")
                    sendText(maxTextRef.current)
                    setOutOfBounds(true)
                    outOfBoundsRef.current=true
                }
                else if(outOfBoundsRef.current)
                {
                    outOfBoundsRef.current = (Temperature <minValueRef.current || Temperature> maxValueRef.current)
                    setOutOfBounds(Temperature<minValueRef.current || Temperature> maxValueRef.current)
                }

                console.log("asssdfsdfd")
            }

        });
    }, []);

    const changeMinValue = event =>{
        setMinValue(parseInt(event.target.value))
        console.log("MIN "+minValue)
    }
    const changeMinText = event =>{
        setMinText(event.target.value)
        console.log(minText)
    }
    const changeMaxValue = event =>{
        setMaxValue(parseInt(event.target.value))
    }
    const changeMaxText = event =>{
        setMaxText(event.target.value)
        console.log(maxText)
    }
     function sendText(message) {
        console.log(server)
        // pass variables within the  query string

        console.log(`https://mainthermoserver.herokuapp.com/send-text?recipient=${text.recipient}&textmessage=${text.textMessage}`)
        if(server===0 && message)
        {
            fetch(`https://mainthermoserver.herokuapp.com/send-text?recipient=+13194001054&textMessage=${message}`)
                .catch(err => console.error(err))
        }
        else if(server===1 && message)
        {
            fetch(`https://server3srdes.herokuapp.com/send-text?recipient=+13194001054&textMessage=${message}`)
                .catch(err => console.error(err))
        }
        else if(server===2 && message){
            fetch(`https://server3copysrdes.herokuapp.com/send-text?recipient=+13194001054&textMessage=${message}`)
                .catch(err => console.error(err))
        }
        setServer((server+1)%3)
    }
    return (
        <div className="App">

            <div className="row">
                <div className="column">

                    <div className="form">
                        <h2>Min Settings</h2>
                        <label htmlFor="fname">Set Min Value</label>
                        <input className="text" id="fname" name="firstname" placeholder="Minimum Value"
                                onChange={changeMinValue}/>
                        <br/>
                        <label htmlFor="lname">Text message</label>
                        <textarea className="text"
                                  placeholder="Enter text message for min value"
                                  onChange={changeMinText}/>
                    </div>
                </div>
                <div className="column">
                    <div className="form">
                        <h2>Max Settings</h2>
                        <label htmlFor="fname">Set Max Value</label>
                        <input className="text" id="fname" name="firstname" placeholder="Maximum Value"
                               onChange={changeMaxValue}/>
                        <br/>
                        <label htmlFor="lname">Text message</label>
                        <textarea className="text"
                                  placeholder="Enter text message for max value"
                                  onChange={changeMaxText}/>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 25 }} >
                <h2> Send Text Message </h2>

                <button onClick={sendText}> Send Text </button>
            </div>
        </div>
    );
}

export default TextSettings;