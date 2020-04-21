import React from 'react';

export default function({children, ...props}) {
    return (
        <div className="mobile-panel" style={{...props.style}}>
            <button className="panel-close-button" onClick={props.onClose}>x</button>
            {children}
        </div>
    )
}