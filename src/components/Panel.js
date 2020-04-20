import React from 'react';

export default function({children, ...props}) {
    return (
        <div tabIndex={props.tabIndex} onBlur={props.onBlur} style={{
            background: 'white',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            overflowX: 'auto',
            zIndex: 2,
            height: '50%',
            ...props.style
        }}>
            <button style={{
                position: 'absolute',
                right: 10,
                top: 0,
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 'large',
                fontWeight: 'bold',
                color: 'red',
                padding: 4,
                border: 0
            }} onClick={props.onClose}>x</button>
            {children}
        </div>
    )
}