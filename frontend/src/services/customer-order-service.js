import axios from "axios"

export async function createCustomerOrder() {
  axios({
    method: "post",
    url: "http://localhost:5000/createCustomerOrder",
  }).catch((err) => console.log(err))
}

export async function getCustomerOrders() {
  return axios({
    method: "get",
    url: "http://localhost:5000/getCustomerOrders",
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
}

export async function getItemsForCustomerOrder(id) {
  return axios({
    method: "get",
    url: "http://localhost:5000/getItemsForCustomerOrder",
    params: {
      id,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
}
