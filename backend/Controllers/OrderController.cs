using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController
    {
        private readonly RestaurantContext Context;

        public OrderController(RestaurantContext context)
        {
            Context = context;
        }

        [HttpGet(Name = "GetOrderById")]
        public CustomerOrder GetOrderById(int id)
        {
            return Context.GetOrderById(id);
        }
    }
}
