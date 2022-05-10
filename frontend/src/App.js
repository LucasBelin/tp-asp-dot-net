import "./App.css"
import Menu from "./containers/menu/Menu"
import Groups from "./containers/groups/Groups"

function App() {
  const groups = [
    {
      id: 1,
      status: "ONGOING",
      orders: [
        {
          item: {
            name: "Oysters",
            type: "STARTER",
            price: 21.5,
          },
          amount: 2,
          status: "REGISTERDED",
        },
        {
          item: {
            name: "Oysters",
            type: "STARTER",
            price: 21.5,
          },
          amount: 2,
          status: "REGISTERDED",
        },
      ],
    },
    {
      id: 2,
      status: "DELIVERED",
      orders: [
        {
          item: {
            name: "Oysters",
            type: "STARTER",
            price: 21.5,
          },
          amount: 2,
          status: "DELIVERED",
        },
        {
          item: {
            name: "Oysters",
            type: "STARTER",
            price: 21.5,
          },
          amount: 2,
          status: "DELIVERED",
        },
      ],
    },
  ]

  return (
    <div className="App">
      {/* <div className="container">
        <input type="text" className="search-input" placeholder="Search order by id" />
        <button className="search-btn">Search</button>
      </div> */}
      <Menu />
      <Groups groups={groups} />
    </div>
  )
}

export default App
