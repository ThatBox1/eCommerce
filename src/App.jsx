import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import { API_URL } from './constant'
import Header from './components/Header/Header'

function App() {
  const [category, setCategory] = useState([])
  const [id, setId] = useState(0)


  let element = useRoutes(
    [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/checkout',
        element: <CheckoutPage />
      },
      {
        path: '/product/:id',
        element: <ProductDetailsPage />
      },
      {
        path: '*',
        element: <NotFoundPage/>      
      }
    ]
  )

  return element

}


export default App
