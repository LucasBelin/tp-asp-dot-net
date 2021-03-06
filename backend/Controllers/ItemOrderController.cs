using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    public class ItemOrderController : Controller
    {
        private readonly RestaurantContext Context;

        public ItemOrderController(RestaurantContext context)
        {
            Context = context;
        }

        [Route("/createItemOrder")]
        [HttpPost]
        public ItemOrder CreateItemOrder(int idCustomerOrder, int idItem, int amount)
        {
            return Context.CreateItemOrder(idCustomerOrder, idItem, amount);
        }

        [Route("/updateItemOrderStatus")]
        [HttpPut]
        public string UpdateItemOrderStatus(int id, string newStatus)
        {
            return Context.UpdateItemOrderStatus(id, newStatus);
        }
    }
}
