import React from 'react';
import "./Button.css";

const STYLES = ['btn--primary','btn--outline']
const SIZES = ['btn--medium','btn--mobile','btn--large','btn--wide']
const COLORS = ['primary','blue','red', 'green']
function Button(props) {
    const {
           children,
            onClick,
            type,
            buttonStyle,
            buttonSize,
            buttonColor
    }= props;
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
    const checkButtonColor = COLORS.includes(buttonColor) ? buttonColor : COLORS[0]

    return (
        <div>
           <button className={`btn ${checkButtonSize} ${checkButtonColor} ${checkButtonStyle}`}
                   onClick={onClick}
                   type={type}
           >
               {children}
           </button>
        </div>
    );
}

export default Button;