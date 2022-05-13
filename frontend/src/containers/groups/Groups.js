import React, { useState, useEffect } from "react"
import "./groups.css"
import Group from "../../components/group/Group"
import { createCustomerOrder, getCustomerOrders } from "../../services/customer-order-service"

function Groups() {
  const [customerOrders, setCustomerOrders] = useState([])

  const fetchCustomerOrders = async () => {
    const result = await getCustomerOrders()
    if (!result || result.length <= 0) return
    setCustomerOrders(result)
  }

  useEffect(() => {
    fetchCustomerOrders()
  }, [])

  return (
    <div className="groups">
      <div className="groups-top">
        <h2 className="groups-title">Orders</h2>
        <button
          onClick={async () => {
            await createCustomerOrder()
            await fetchCustomerOrders()
          }}
        >
          Create order
        </button>
      </div>
      <div className="groups-container">
        {customerOrders.map((order, i) => (
          <Group group={order} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Groups
