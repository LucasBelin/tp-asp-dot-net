namespace backend.Models
{
    public class ItemOrder
    {
        public int Id { get; set; }
        public Item Item { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
    }
}
