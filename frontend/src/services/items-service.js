import axios from "axios"

export async function getItems() {
  return axios({
    method: "get",
    url: "http://localhost:5000/getItems",
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
}
