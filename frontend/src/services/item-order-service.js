import axios from "axios"

export async function createItemOrder(idCustomerOrder, idItem, amount) {
  axios({
    method: "post",
    url: "http://localhost:5000/createItemOrder",
    params: {
      idCustomerOrder,
      idItem,
      amount,
    },
  }).catch((err) => console.log(err))
}
