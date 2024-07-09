import { useDispatch } from 'react-redux'
import './card.scss'
import { addItemToCart } from '../../redux/cartSlice';

export const Card = ({img, id, title, dateDelivery, price}) => {
  const dispanth = useDispatch();

  const handlerAddToCart = () => {
    dispanth(addItemToCart({img, id, title, dateDelivery, price}))
  }
  const showTextAddToCard = ({target}) => {
    target.textContent = 'в корзину';
  }
  const removeTextAddToCard = ({target}) => {
    target.innerHTML = `${price}&nbsp;₽`;
  }

  return (
  <article className="goods__card card">
    <img className="card__image" src={img} alt={title} />
    <div className="card__content">
      <h3 className="card__title">{title}</h3>
      <div className="card__footer">
        <p className="card__date-delivery">{dateDelivery}</p>
        <button className="card__button" onClick={handlerAddToCart} onMouseOver={showTextAddToCard} onMouseOut={removeTextAddToCard} >{price}&nbsp;₽</button>
      </div>
    </div>
  </article>
)}