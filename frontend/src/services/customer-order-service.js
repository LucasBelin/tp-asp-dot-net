import axios from "axios"

export async function createCustomerOrder() {
  return axios({
    method: "post",
    url: "http://localhost:5000/createCustomerOrder",
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
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

export async function updateCustomerOrderStatus(id, newStatus) {
  return axios({
    method: "put",
    url: "http://localhost:5000/updateCustomerOrderStatus",
    params: {
      id,
      newStatus,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
}
