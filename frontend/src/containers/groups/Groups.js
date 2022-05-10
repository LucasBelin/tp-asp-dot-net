import React from "react"
import "./groups.css"
import Group from "../group/Group"

function Groups({ groups }) {
  return (
    <div className="groups">
      <h2 className="groups-title">Orders</h2>
      <div className="groups-container">
        {groups.map((group, i) => (
          <Group group={group} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Groups
