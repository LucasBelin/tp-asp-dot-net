import React from "react"
import "./menu-section.css"
import Item from "../item/Item"

function MenuSection({ title, items }) {
  return (
    <div className="section-container">
      <h3>{title}</h3>
      <div className="items">
        {items.map((item, i) => (
          <Item name={item.name} price={item.price} key={i} />
        ))}
      </div>
    </div>
  )
}

export default MenuSection
