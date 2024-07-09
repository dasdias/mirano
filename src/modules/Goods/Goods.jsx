import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import './goods.scss'
import { useSelector } from "react-redux";
import { API_URL } from "../../const";

export const Goods = () => {
  const {items : goods, status: goodsStatus, error} = useSelector((state) => state.goods)

  let content = null;

  if (goodsStatus === 'loading') {
    content = <p>Loading...</p>
    
  }
  if (goodsStatus === 'successed') {
    content = (
      <ul className="goods__list">
        {goods.map((item) => (
        
          <li key={item.id} className="goods__item">
            <Card
              img={`${API_URL}${item.photoUrl}`}
              id={item.id}
              title={item.name}
              dateDelivery="сегодня в 14:00"
              price={item.price}
              />
          </li>
        ))}
      </ul>
    )
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
  <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          {content}
        </div>

      <Cart/>

      </div>
    </section>
)}