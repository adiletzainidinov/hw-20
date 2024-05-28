import { useSelector, useDispatch } from 'react-redux';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = (props) => {
  const dispatch = useDispatch();
  const { addedMeals, isLoading, error } = useSelector((state) => state.basket);

  const totalAmount = addedMeals
    .reduce((acc, item) => acc + item.price * item.amount, 0)
    .toFixed(2);
  const hasItems = addedMeals.length > 0;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {addedMeals.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
