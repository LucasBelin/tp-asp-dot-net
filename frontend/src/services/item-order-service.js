import axios from "axios"

export async function createItemOrder(idCustomerOrder, idItem, amount) {
  return axios({
    method: "post",
    url: "http://localhost:5000/createItemOrder",
    params: {
      idCustomerOrder,
      idItem,
      amount,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
}

export async function updateItemOrderStatus(id, newStatus) {
  return axios({
    method: "put",
    url: "http://localhost:5000/updateItemOrderStatus",
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
