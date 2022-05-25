import React, { useCallback, useRef } from "react"
import "./order.css"
import Item from "../item/Item"
import Separator from "../separator/Separator"
import { updateItemOrderStatus } from "../../services/item-order-service"

function Order({ order, checkOrdersStatus }) {
  const statusRef = useRef()

  const updateStatus = useCallback(async () => {
    await updateItemOrderStatus(order.id, statusRef.current.value)
    checkOrdersStatus()
  }, [order, checkOrdersStatus])

  return (
    <div className="order-container">
      <div className="item-and-type">
        <Item name={order.item.name} price={order.item.price} amount={order.amount} />
        <div className="dropdown">
          <select
            name="statuses"
            id="statuses"
            defaultValue={order.status}
            onChange={updateStatus}
            ref={statusRef}
          >
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
