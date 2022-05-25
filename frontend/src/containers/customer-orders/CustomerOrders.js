import React, { useState, useEffect, useCallback } from "react"
import "./customer-orders.css"
import CustomerOrder from "../../components/customer-order/CustomerOrder"
import { createCustomerOrder, getCustomerOrders } from "../../services/customer-order-service"
import Spinner from "../../components/spinner/Spinner"

function CustomerOrders() {
  const [customerOrders, setCustomerOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCustomerOrders = useCallback(async () => {
    setIsLoading(true)
    const result = await getCustomerOrders()
    if (!result || result.length <= 0) return
    setCustomerOrders(result)
    setIsLoading(false)
  }, [setIsLoading, setCustomerOrders])

  const onCreateCustomerOrder = useCallback(async () => {
    const savedCustomerOrder = await createCustomerOrder()
    if (!savedCustomerOrder) return
    setCustomerOrders([...customerOrders, savedCustomerOrder])
  }, [customerOrders, setCustomerOrders])

  useEffect(() => {
    fetchCustomerOrders()
    //eslint-disable-next-line
  }, [])

  return (
    <div className="customer-orders">
      <div className="customer-orders-top">
        <h2 className="customer-orders-title">Orders</h2>
        <button onClick={onCreateCustomerOrder}>Create order</button>
      </div>
      {!isLoading && (
        <div className="customer-orders-container">
          {customerOrders.map((order, i) => (
            <CustomerOrder order={order} key={i} />
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

export default CustomerOrders
