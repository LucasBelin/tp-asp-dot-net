import React, { useState, useEffect } from "react"
import "./groups.css"
import Group from "../../components/group/Group"
import { createCustomerOrder, getCustomerOrders } from "../../services/customer-order-service"
import Spinner from "../../components/spinner/Spinner"

function Groups() {
  const [customerOrders, setCustomerOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCustomerOrders = async () => {
    setIsLoading(true)
    const result = await getCustomerOrders()
    if (!result || result.length <= 0) return
    setCustomerOrders(result)
    setIsLoading(false)
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
            await createCustomerOrder().then(() => fetchCustomerOrders())
          }}
        >
          Create order
        </button>
      </div>
      {!isLoading && (
        <div className="groups-container">
          {customerOrders.map((order, i) => (
            <Group group={order} key={i} />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="spinner-container">
          <Spinner size={100} />
        </div>
      )}
    </div>
  )
}

export default Groups
