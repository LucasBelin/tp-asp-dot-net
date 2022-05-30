import React, { useCallback, useRef, useState } from "react"
import "./item-order.css"
import Item from "../item/Item"
import Separator from "../separator/Separator"
import { updateItemOrderStatus } from "../../services/item-order-service"

function ItemOrder({ order, checkOrdersStatus, separator = true }) {
  const statusRef = useRef()

  const [status, setStatus] = useState(order.status)

  const updateStatus = useCallback(async () => {
    await updateItemOrderStatus(order.id, statusRef.current.value)
    setStatus(statusRef.current.value)
    checkOrdersStatus()
  }, [order, checkOrdersStatus])

  return (
    <div className="item-order-container">
      <div className="item-and-status">
        <Item name={order.item.name} price={order.item.price} amount={order.amount} />
        <div className="dropdown">
          <select
            name="statuses"
            id="statuses"
            defaultValue={status}
            onChange={updateStatus}
            ref={statusRef}
          >
            <option value="REGISTERED" selected>
              REGISTERED
            </option>
            <option value="PREPARATION">PREPARATION</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      </div>
      {separator && <Separator />}
    </div>
  )
}

export default ItemOrder
