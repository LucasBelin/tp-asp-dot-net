using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerOrderController : Controller
    {
        private readonly RestaurantContext Context;

        public CustomerOrderController(RestaurantContext context)
        {
            Context = context;
        }

        [HttpPost(Name = "/CreateCustomerOrder")]
        public int CreateCustomerOrder()
        {
            return Context.CreateCustomerOrder();
        }
    }
}
