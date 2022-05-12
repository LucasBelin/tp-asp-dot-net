import React from "react"
import "./group.css"
import Order from "../../components/order/Order"

function Group({ group }) {
  return (
    <div className="group">
      <div className="top">
        <div className="left">
          <h2>Group {group.id}</h2>
          <span>({group.status})</span>
        </div>
        <button className="btn-new-order">Create new order</button>
      </div>
      <div className="orders">
        {group.orders.map((order, i) => (
          <Order order={order} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Group
