namespace backend.Models
{
    public class ItemOrder
    {
        public Item Item { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
    }
}
