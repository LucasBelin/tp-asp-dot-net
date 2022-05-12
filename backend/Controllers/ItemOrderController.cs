using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemOrderController : Controller
    {
        private readonly RestaurantContext Context;

        public ItemOrderController(RestaurantContext context)
        {
            Context = context;
        }

        [HttpPost(Name = "/CreateItemOrder")]
        public int CreateItemOrder(int idCustomerOrder, [FromBody] List<ItemOrder> orders)
        {
            return Context.CreateItemOrder(idCustomerOrder, orders);
        }
    }
}
