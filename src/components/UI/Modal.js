import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css"

const Backdrop = (props) => {
    return(
        <div onClick={props.onClick} className={classes.backdrop}/>
    )
}

const ModalOverlay = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const Modal = (props) => {

    const portalPlaceholder = document.getElementById('overlays')

    return(
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalPlaceholder)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalPlaceholder)}
        </>
    )
}

export default Modal