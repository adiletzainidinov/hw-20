import { useDispatch } from 'react-redux';
import { addBasketThunk, removeBasketThunk } from '../../redux/actions/basketActions';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();

  // Убедимся, что price - число и установим значение по умолчанию, если оно undefined
  const price = props.price ? `$${props.price.toFixed(2)}` : '$0.00';

  const addItemHandler = () => {
    const newMeal = {
      id: props.id,
      name: props.name,
      amount: 1,  // Поскольку мы добавляем один элемент
      price: props.price,
    };
    dispatch(addBasketThunk(newMeal));
  };

  const removeItemHandler = () => {
    dispatch(removeBasketThunk(props.id));
  };

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemHandler}>−</button>
        <button onClick={addItemHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
