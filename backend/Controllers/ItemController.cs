using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{

    public class ItemController : Controller
    {
        private readonly RestaurantContext Context;

        public ItemController(RestaurantContext context)
        {
            Context = context;
        }

        [Route("/getItems")]
        [HttpGet]
        public List<Item> GetAllItems()
        {
            return Context.GetAllItems();
        }
    }
}
