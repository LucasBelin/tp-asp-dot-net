import React, { useCallback, useRef, useState, useEffect } from "react"
import "./customer-order.css"
import Order from "../order/Order"
import { getItems } from "../../services/items-service"
import { createItemOrder } from "../../services/item-order-service"
import {
  getItemsForCustomerOrder,
  updateCustomerOrderStatus,
} from "../../services/customer-order-service"

function CustomerOrder({ order }) {
  const refDialog = useRef()
  const refItemSelect = useRef()
  const refTypeSelect = useRef()
  const refAmountSelect = useRef()

  const [status, setStatus] = useState(order.status)
  const [itemOrders, setItemOrders] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [currentItems, setCurrentItems] = useState([])

  const fetchItemOrders = useCallback(async () => {
    const result = await getItemsForCustomerOrder(order.id)
    if (!result || result.length <= 0) return result

    setItemOrders(result)
    return result
  }, [order])

  useEffect(() => {
    fetchItemOrders()
  }, [order, fetchItemOrders])

  const changeCurrentItems = useCallback(
    (fromItems) => {
      if (!fromItems || fromItems.length <= 0) return
      setCurrentItems(fromItems.filter((item) => item.type === refTypeSelect.current.value))
    },
    [setCurrentItems],
  )

  const showDialog = useCallback(async () => {
    refDialog.current.showModal()
    refDialog.current.classList.toggle("hidden")

    const fetchedItems = await getItems()
    setMenuItems(fetchedItems)
    changeCurrentItems(fetchedItems)
  }, [refDialog, changeCurrentItems])

  const closeDialog = useCallback(() => {
    refDialog.current.close()
    refDialog.current.classList.toggle("hidden")
  }, [])

  const saveItem = useCallback(async () => {
    const item = currentItems.find((item) => item.name === refItemSelect.current.value)
    const amount = refAmountSelect.current.value

    const savedItem = await createItemOrder(order.id, item.id, +amount)
    if (!savedItem) return
    setItemOrders([...itemOrders, savedItem])
    setStatus("ONGOING")

    refDialog.current.close()
    refDialog.current.classList.toggle("hidden")
  }, [order, currentItems, itemOrders])

  const checkOrdersStatus = useCallback(async () => {
    const result = await fetchItemOrders()
    const updatedItemOrders = result.filter((itemOrder) => itemOrder.status !== "DELIVERED")

    if (updatedItemOrders.length <= 0) {
      await updateCustomerOrderStatus(order.id, "DELIVERED")
      setStatus("DELIVERED")
      return
    }

    if (status !== "ONGOING") {
      await updateCustomerOrderStatus(order.id, "ONGOING")
      setStatus("ONGOING")
    }
  }, [order, status, fetchItemOrders])

  return (
    <div className="customer-order">
      <div className="top">
        <div className="left">
          <h2>Order {order.id}</h2>
          <span>({status})</span>
        </div>
        <button onClick={showDialog} className="btn-new-item">
          Add item
        </button>
      </div>
      <div className="orders">
        {itemOrders &&
          itemOrders.length > 0 &&
          itemOrders.map((order, i) => (
            <Order order={order} key={i} checkOrdersStatus={checkOrdersStatus} />
          ))}
      </div>

      <dialog ref={refDialog} className="dialog hidden">
        <div className="title-close">
          <h3>Add item</h3>
          <button onClick={closeDialog}>&#10005;</button>
        </div>
        <div className="item-select">
          <select name="item" id="item" ref={refItemSelect}>
            {currentItems.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
          <select
            name="type"
            id="type"
            ref={refTypeSelect}
            onChange={() => {
              changeCurrentItems(menuItems)
            }}
          >
            <option value="STARTER">STARTERS</option>
            <option value="DISH">DISHES</option>
            <option value="DESSERT">DESSERTS</option>
            <option value="DRINK">DRINKS</option>
          </select>
          <input
            ref={refAmountSelect}
            type="number"
            min={1}
            name="amount"
            id="amount"
            placeholder="Amount"
            defaultValue={1}
          />
        </div>
        <button onClick={saveItem} className="btn-save">
          Save
        </button>
      </dialog>
    </div>
  )
}

export default CustomerOrder
