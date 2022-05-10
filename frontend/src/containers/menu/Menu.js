import React from "react"
import "./menu.css"
import MenuSection from "../menu-section/MenuSection"
import Separator from "../../components/separator/Separator"

function Menu() {
  const items = [
    {
      name: "Oysters",
      price: 21.5,
    },
    {
      name: "Champagne",
      price: 55,
    },
  ]

  return (
    <div className="menu">
      <h2 className="menu-title">Menu</h2>
      <div className="menu-section-container">
        <MenuSection title="Starters" items={items} />
        <Separator />
        <MenuSection title="Dishes" items={items} />
        <Separator />
        <MenuSection title="Desserts" items={items} />
        <Separator />
        <MenuSection title="Drinks" items={items} />
      </div>
    </div>
  )
}

export default Menu
