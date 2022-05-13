import React, { useCallback, useRef, useState, useEffect } from "react"
import "./group.css"
import Order from "../../components/order/Order"
import { getItems } from "../../services/items-service"
import { createItemOrder } from "../../services/item-order-service"
import { getItemsForCustomerOrder } from "../../services/customer-order-service"

function Group({ group }) {
  const refDialog = useRef()
  const refItemSelect = useRef()
  const refTypeSelect = useRef()
  const refAmountSelect = useRef()

  const [itemOrders, setItemOrders] = useState([])
  const [items, setItems] = useState([])
  const [currentItems, setCurrentItems] = useState([])

  const fetchItemOrders = useCallback(async () => {
    const result = await getItemsForCustomerOrder(group.id)
    if (!result || result.length <= 0) return
    setItemOrders(result)
  }, [group])

  useEffect(() => {
    fetchItemOrders()
  }, [group, fetchItemOrders])

  const changeCurrentItems = useCallback(
    (fromitems) => {
      if (!fromitems || fromitems.length <= 0) return
      switch (refTypeSelect.current.value) {
        case "STARTER":
          setCurrentItems(() => {
            return fromitems.filter((item) => item.type === "STARTER")
          })
          break
        case "DISH":
          setCurrentItems(() => {
            return fromitems.filter((item) => item.type === "DISH")
          })
          break
        case "DESSERT":
          setCurrentItems(() => {
            return fromitems.filter((item) => item.type === "DESSERT")
          })
          break
        case "DRINK":
          setCurrentItems(() => {
            return fromitems.filter((item) => item.type === "DRINK")
          })
          break
        default:
          throw new Error(`${refTypeSelect.current.value} is not supported`)
      }
    },
    [setCurrentItems],
  )

  const showDialog = useCallback(async () => {
    refDialog.current.showModal()
    refDialog.current.classList.toggle("hidden")
    const fetchedItems = await getItems()
    setItems(fetchedItems)
    changeCurrentItems(fetchedItems)
  }, [refDialog, changeCurrentItems])

  const closeDialog = useCallback(() => {
    refDialog.current.close()
    refDialog.current.classList.toggle("hidden")
  }, [])

  const saveItem = useCallback(async () => {
    const item = currentItems.find((item) => item.name === refItemSelect.current.value)
    const amount = refAmountSelect.current.value
    await createItemOrder(group.id, item.id, +amount)
    refDialog.current.close()
    refDialog.current.classList.toggle("hidden")
    await fetchItemOrders()
  }, [group, currentItems, fetchItemOrders])

  return (
    <div className="group">
      <div className="top">
        <div className="left">
          <h2>Order {group.id}</h2>
          <span>({group.status})</span>
        </div>
        <button onClick={showDialog} className="btn-new-item">
          Add item
        </button>
      </div>
      <div className="orders">{itemOrders && itemOrders.length > 0 && itemOrders.map((order, i) => <Order order={order} key={i} />)}</div>

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
              changeCurrentItems(items)
            }}
          >
            <option value="STARTER">STARTERS</option>
            <option value="DISH">DISHES</option>
            <option value="DESSERT">DESSERTS</option>
            <option value="DRINK">DRINKS</option>
          </select>
          <input ref={refAmountSelect} type="number" min={1} name="amount" id="amount" placeholder="Amount" defaultValue={1} />
        </div>
        <button onClick={saveItem} className="btn-save">
          Save
        </button>
      </dialog>
    </div>
  )
}

export default Group
