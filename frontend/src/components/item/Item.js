import React from "react"
import "./item.css"

function Item({ name, type, price }) {
  return (
    <div className="item">
      <span className="name">{name}</span> / <span className="price">${price}</span>
    </div>
  )
}

export default Item
