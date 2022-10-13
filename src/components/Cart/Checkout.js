import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css"

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [inputsValidity, setInputsValidity] = useState({
        name:true,
        street: true,
        city: true,
        postal:true,
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault()

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid,

        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city: enteredCity,
            postal:enteredPostal
        })

    }

return(
    <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${inputsValidity.name ? '' : classes.invalid }`}>
            <label htmlFor='name'>Your name</label>
            <input ref={nameInputRef} type='text' id='name' />
            { !inputsValidity.name && <p>Please enter a valid name</p> }
        </div>
        <div className={`${classes.control} ${inputsValidity.street ? '' : classes.invalid }`}>
            <label htmlFor='street'>Street</label>
            <input ref={streetInputRef} type='text' id='street' />
            { !inputsValidity.street && <p>Please enter a valid street</p> }
        </div>
        <div className={`${classes.control} ${inputsValidity.postal ? '' : classes.invalid }`}>
            <label htmlFor='postal'>Postal code</label>
            <input ref={postalInputRef} type='text' id='postal' />
            { !inputsValidity.postal && <p>Please enter a valid postal code</p> }
        </div>
        <div className={`${classes.control} ${inputsValidity.city ? '' : classes.invalid }`}>
            <label htmlFor='city'>City</label>
            <input ref={cityInputRef} type='text' id='city' />
            { !inputsValidity.city && <p>Please enter a valid city</p> }
        </div>
       <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
       </div>
    </form>
)
}

export default Checkout;