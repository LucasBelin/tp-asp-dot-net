namespace backend.Models
{
    public class CustomerOrder
    {
        public int Id { get; set; }
        public List<ItemOrder> Orders { get; set; }
        public string Status { get; set; }
    }
}
