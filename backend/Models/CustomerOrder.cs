namespace backend.Models
{
    public class CustomerOrder
    {
        public List<ItemOrder> Orders { get; set; }
        public string Status { get; set; }
    }
}
