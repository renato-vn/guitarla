import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"
const App = () => {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    const itemExists = cart.findIndex((cart) => cart.id === item.id)
    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      const itemClone = Object.assign({}, item);
      itemClone.quantity = 1
      setCart([...cart, itemClone])
    }
  }

  console.log({cart})

  return (
    <>

      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) =>
              <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
            )
          }

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
