import React, { useState, useEffect } from "react"
import "./menu.css"
import MenuSection from "../../components/menu-section/MenuSection"
import Separator from "../../components/separator/Separator"
import { getItems } from "../../services/items-service"
import Spinner from "../../components/spinner/Spinner"

function Menu() {
  const [starters, setStarters] = useState([])
  const [dishes, setDishes] = useState([])
  const [desserts, setDesserts] = useState([])
  const [drinks, setDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true)
      const items = await getItems()
      if (!items || items.length <= 0) return
      setStarters(items.filter((item) => item.type === "STARTER"))
      setDishes(items.filter((item) => item.type === "DISH"))
      setDesserts(items.filter((item) => item.type === "DESSERT"))
      setDrinks(items.filter((item) => item.type === "DRINK"))
      setIsLoading(false)
    }
    fetchItems()
  }, [])

  return (
    <div className="menu">
      <h2 className="menu-title">Menu</h2>
      {!isLoading && (
        <div className="menu-section-container">
          <MenuSection title="Starters" items={starters} />
          <Separator />
          <MenuSection title="Dishes" items={dishes} />
          <Separator />
          <MenuSection title="Desserts" items={desserts} />
          <Separator />
          <MenuSection title="Drinks" items={drinks} />
        </div>
      )}
      {isLoading && (
        <div className="spinner-container">
          <Spinner size={100} />
        </div>
      )}
    </div>
  )
}

export default Menu
