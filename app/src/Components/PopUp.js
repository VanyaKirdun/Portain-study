import React from 'react'
import './PopUp.css'

const PopUp = (props) => {
    return (
        <div className={props.active ? 'popUp active' : 'popUp'} onClick={()=>props.setActive(false)}>
            <div className={props.active ? 'popUp__content active' : 'popUp__content'} onClick={e=>e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}

export default PopUp;