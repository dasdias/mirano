import { Hero } from "./modules/Hero/Hero"
import { Filter } from "./modules/Filter/Filter"
import { Footer } from "./modules/Footer/Footer"
import { Goods } from "./modules/Goods/Goods"
import { Header } from "./modules/Header/Header"
import { Order } from "./modules/Order/Order"
import { Subscribe } from "./modules/Subscribe/Subscribe"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { registerCart } from "./redux/cartSlice"

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, settitleGoods] = useState('');

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
    }
    initializeCart()
  }, [dispatch])

  return (
    <>
      <Header/>

      <main>
      
        <Hero/>

        <Filter settitleGoods={settitleGoods}/>

        <Goods title={titleGoods} />

        <Subscribe/>
      </main>
      
      <Footer/>

      <Order/>

      
    </>
  )
}