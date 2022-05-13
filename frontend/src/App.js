import "./App.css"
import Menu from "./containers/menu/Menu"
import Groups from "./containers/groups/Groups"

function App() {
  return (
    <div className="App">
      <h1 className="striped">Restaurant API</h1>
      <Menu />
      <Groups />
    </div>
  )
}

export default App
