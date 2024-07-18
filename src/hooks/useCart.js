import { useState, useEffect } from 'react'

export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    const addToCart = (item) => {
        const itemExists = cart.findIndex((cart) => cart.id === item.id)
        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            const itemClone = Object.assign({}, item)
            itemClone.quantity = 1
            setCart([...cart, itemClone])
        }
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.quantity < MAX_ITEMS
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
        setCart(updatedCart)
    }

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.quantity > MIN_ITEMS
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return {
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    }
}
