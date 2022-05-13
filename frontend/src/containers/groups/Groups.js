import React, { useState, useEffect } from "react"
import "./groups.css"
import Group from "../../components/group/Group"
import { createCustomerOrder, getCustomerOrders } from "../../services/customer-order-service"

function Groups() {
  const [customerOrders, setCustomerOrders] = useState([])

  useEffect(() => {
    async function fetchCustomerOrders() {
      const result = await getCustomerOrders()
      setCustomerOrders(result)
    }
    fetchCustomerOrders()
  }, [])

  return (
    <div className="groups">
      <div className="groups-top">
        <h2 className="groups-title">Orders</h2>
        <button onClick={createCustomerOrder}>Create order</button>
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
