import "./App.css"
import Menu from "./containers/menu/Menu"
import CustomerOrders from "./containers/customer-orders/CustomerOrders"

function App() {
  return (
    <div className="App">
      <h1 className="striped">Restaurant API</h1>
      <Menu />
      <CustomerOrders />
    </div>
  )
}

export default App
