import React, { useContext, useState } from "react";
import classes from "./Cart.module.css"
import Modal from "../UI/Modal"
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {

    const [showCheckout, setShowCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1})
    }
    const orderHandler = () => {
        setShowCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://food-order-app-f0a1d-default-rtdb.europe-west1.firebasedatabase.app/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems:cartCtx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const CartItems = (<ul className={classes['cart-items']}>{cartCtx.items.map((item) => (<CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>))}</ul>)
    const modalActions = ( <div className={classes.actions}>
        <button onClick={props.onCloseCart} className={classes['button--alt']}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>)

    const cartModalContent = <>{CartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div>
    { showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
    { !showCheckout && modalActions }
   </>

   const isSubmittingModalContent = <p>Sending order data...</p>
   const didSubmitModalContent = <>
                                    <p>Succesfully sent the order!</p>
                                    <div className={classes.actions}>
        <button onClick={props.onCloseCart} className={classes.button}>Close</button>
    </div>
                                </>

    return(
        <Modal onClick={props.onCloseCart}>
            { !isSubmitting && !didSubmit && cartModalContent }
            { isSubmitting && isSubmittingModalContent }
            { !isSubmitting && didSubmit && didSubmitModalContent }
        </Modal>
    )
}

export default Cart;