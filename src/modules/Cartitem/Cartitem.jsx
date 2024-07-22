import { useDispatch } from "react-redux";
import { API_URL } from "../../const";
import { useState } from "react";
import { addItemToCart } from "../../redux/cartSlice";
import { debounce } from "../../util";

export const CartItem = ({ id, photoUrl, price, name, quantity }) => {
  const dispatch = useDispatch();

  const [inputQuantity, setInputQuantity] = useState(quantity);

  const debounceInputChange = debounce((newQuantity) => {
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  }, 500);

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  }
  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(inputQuantity - 1)
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }))
  }
  const handleIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(inputQuantity + 1)
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }))
  }


  return (
    <li className="cart__item">
      <img className="cart__img" src={`${API_URL}${photoUrl}`} alt={name} />
      <h4 className="cart__item-title">{name}</h4>
      <div className="cart__counter">
        <button className="cart__counter-btn" onClick={handleDecrement}>-</button>
        <input className="cart__counter-input" type="number" max="99" min="0" value={inputQuantity} onChange={handleInputChange} />
        <button className="cart__counter-btn" onClick={handleIncrement}>+</button>
      </div>
      <p className="cart__price">{price * inputQuantity}&nbsp;₽</p>
    </li>
  )
}