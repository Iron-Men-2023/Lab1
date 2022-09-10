import React, {useState} from 'react';
import ThermometerImage from "../ThermometerImage";
import ProgressBar from "../ProgressBar";


function Home(props) {
    const [value, setValue] = useState('0');
    const handleChange = event => {
        setValue(event.target.value);
    };
    return (
        <div>
            <h2>Enter temperature</h2>
            <input type="text"
                   id="value"
                   name="value"
                   onChange={handleChange}
                   value={value}
            />
            <ThermometerImage value={value}/>
        </div>
    );
}

export default Home;