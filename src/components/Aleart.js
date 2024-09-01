import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <center>
        <div style={{height: '50px', width: "25%",marginTop: "-2%", position:"fixed"}}>
        {props.alert && <div className={` container  alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
        </center>
    )
}

export default Alert