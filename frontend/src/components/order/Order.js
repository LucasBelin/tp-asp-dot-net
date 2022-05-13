import React from "react"
import "./order.css"
import Item from "../item/Item"
import Separator from "../separator/Separator"

function Order({ order }) {
  return (
    <div className="order-container">
      <div className="item-and-type">
        <Item name={order.item.name} price={order.item.price} amount={order.amount} />
        <div className="dropdown">
          <select name="statuses" id="statuses" defaultValue={order.status}>
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
