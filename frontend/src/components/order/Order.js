import React from "react"
import "./order.css"
import Item from "../item/Item"
import Separator from "../separator/Separator"

function Order({ order, last = false }) {
  return (
    <div className="order-container">
      <div>
        <Item name={order.item.name} price={order.item.price} />
        <div className="dropdown">
          <select name="statuses" id="statuses">
            <option value="REGISTERED">REGISTERED</option>
            <option value="PREPARATION">PREPARATION</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      </div>
      <Separator />
    </div>
  )
}

export default Order
