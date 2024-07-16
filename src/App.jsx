import { Hero } from "./modules/Hero/Hero"
import { Filter } from "./modules/Filter/Filter"
import { Footer } from "./modules/Footer/Footer"
import { Goods } from "./modules/Goods/Goods"
import { Header } from "./modules/Header/Header"
import { Order } from "./modules/Order/Order"
import { Subscribe } from "./modules/Subscribe/Subscribe"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { fetchCart, registerCart } from "./redux/cartSlice"

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, settitleGoods] = useState('');

  const filterRef = useRef(null);

  const scrollToFilter = () => {
    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    }
    initializeCart()
  }, [dispatch])

  return (
    <>
      <Header settitleGoods={settitleGoods} scrollToFilter={scrollToFilter} />

      <main>

        <Hero />

        <Filter settitleGoods={settitleGoods} filterRef={filterRef} />

        <Goods title={titleGoods} />

        <Subscribe />
      </main>

      <Footer />

      <Order />


    </>
  )
}