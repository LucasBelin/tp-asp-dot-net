using MySql.Data.MySqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace backend.Models
{
    public class RestaurantContext : DbContext
    {
        private readonly string _connectionString;
        public RestaurantContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        private MySqlConnection GetConnection()
        {
            Console.WriteLine(_connectionString);
            return new MySqlConnection(_connectionString);
        }

        public List<Item> GetAllItems()
        {
            List<Item> items = new();

            using(MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from Item", conn);

                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = reader.GetUInt32("id_item"),
                            Name = reader.GetString("name"),
                            Type = reader.GetString("type"),
                            Price = reader.GetInt32("price")
                        });
                    }
                }
            }

            return items;
        }

        public CustomerOrder GetOrderById(int id)
        {
            CustomerOrder order = new CustomerOrder();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select name, type, amount, price * amount as total_price, ItemOrder.status as item_status," +
                    "CustomerOrder.status as order_status from (CustomerOrder inner join ItemOrder on CustomerOrder.id_order = ItemOrder.id_order)" +
                    "inner join Item on ItemOrder.id_item = Item.id_item where CustomerOrder.id_order = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    List<ItemOrder> itemOrders = new();
                    while (reader.Read())
                    {                  
                        itemOrders.Add(new ItemOrder()
                        {
                            Name = reader.GetString("name"),
                            Type = reader.GetString("type"),
                            Amount = reader.GetInt32("amount"),
                            Price = reader.GetInt32("total_price"),
                            Status = reader.GetString("item_status")
                        });
                        order.Status = reader.GetString("order_status");
                    }
                    order.Orders = itemOrders;
                }
            }

            return order;
        }

        public int CreateCustomerOrder()
        {
            using(MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "INSERT INTO CustomerOrder VALUES(0, 'ONGOING')";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
