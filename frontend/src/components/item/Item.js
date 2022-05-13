import React from "react"
import "./item.css"

function Item({ name, price, amount }) {
  if (amount) {
    return (
      <div className="item">
        <span className="name">
          {amount}x {name}
        </span>{" "}
        / <span className="price">${price}</span>
      </div>
    )
  }

  return (
    <div className="item">
      <span className="name">{name}</span> / <span className="price">${price}</span>
    </div>
  )
}

export default Item
