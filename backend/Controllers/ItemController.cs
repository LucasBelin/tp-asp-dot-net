using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : Controller
    {
        private readonly RestaurantContext Context;

        public ItemController(RestaurantContext context)
        {
            Context = context;
        }

        [HttpGet(Name = "/GetAllItems")]
        public List<Item> GetAllItems()
        {
            return Context.GetAllItems();
        }
    }
}
