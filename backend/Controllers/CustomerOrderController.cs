using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    public class CustomerOrderController : Controller
    {
        private readonly RestaurantContext Context;

        public CustomerOrderController(RestaurantContext context)
        {
            Context = context;
        }

        [Route("/createCustomerOrder")]
        [HttpPost]
        public CustomerOrder CreateCustomerOrder()
        {
            return Context.CreateCustomerOrder();
        }

        [Route("/getItemsForCustomerOrder")]
        [HttpGet]
        public List<ItemOrder> GetItemsForCustomerOrder(int id)
        {
            return Context.GetItemsForCustomerOrder(id);
        }

        [Route("/getCustomerOrders")]
        [HttpGet]
        public List<CustomerOrder> GetCustomerOrders()
        {
            return Context.GetCustomerOrders();
        }
        
        [Route("/updateCustomerOrderStatus")]
        [HttpPut]
        public int UpdateCustomerOrderStatus(int id, string newStatus) {
            return Context.UpdateCustomerOrderStatus(id, newStatus);
        }
    }
}
