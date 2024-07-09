import { useDispatch } from 'react-redux'
import './card.scss'
import { addItemToCart } from '../../redux/cartSlice';
import { useState } from 'react';

export const Card = ({img, id, title, dateDelivery, price}) => {
  const dispanth = useDispatch();

  const [buttonText, setButtonText] = useState(`${price}\u00A0₽`)

  const handlerAddToCart = () => {
    dispanth(addItemToCart({img, id, title, dateDelivery, price}))
  }
  const handleMouseEnter = () => {
    setButtonText('в корзину')
  }
  const handleMouseLeave = () => {
    setButtonText(`${price}\u00A0₽`)    
  }

  return (
  <article className="goods__card card">
    <img className="card__image" src={img} alt={title} />
    <div className="card__content">
      <h3 className="card__title">{title}</h3>
      <div className="card__footer">
        <p className="card__date-delivery">{dateDelivery}</p>
        <button className="card__button" onClick={handlerAddToCart} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >{buttonText}</button>
      </div>
    </div>
  </article>
)}