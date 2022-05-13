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
                            Id = reader.GetInt32("id_item"),
                            Name = reader.GetString("name"),
                            Type = reader.GetString("type"),
                            Price = reader.GetInt32("price")
                        });
                    }
                }
            }

            return items;
        }

        

        public List<ItemOrder> GetItemsForCustomerOrder(int id)
        {
            List<ItemOrder> items = new();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select id_item_order, Item.id_item, name, type, amount, price * amount as total_price, ItemOrder.status as item_status " +
                    "from (CustomerOrder inner join ItemOrder on CustomerOrder.id_order = ItemOrder.id_order) " +
                    "inner join Item on ItemOrder.id_item = Item.id_item where CustomerOrder.id_order = @id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        items.Add(new ItemOrder()
                        {
                            Id =reader.GetInt32("id_item_order"),
                            Item = new Item() {
                                Id = reader.GetInt32("id_item"),
                                Name = reader.GetString("name"),
                                Type = reader.GetString("type"),
                                Price = reader.GetInt32("total_price"),
                            },
                            Amount = reader.GetInt32("amount"),
                            Status = reader.GetString("item_status")
                        });
                    }
                }
            }

            return items;
        }

        public List<CustomerOrder> GetCustomerOrders()
        {
            List<CustomerOrder> orders = new List<CustomerOrder>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select * from CustomerOrder";
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        orders.Add(new()
                        {
                            Id = reader.GetInt32("id_order"),
                            Orders = new(),
                            Status = reader.GetString("status")
                        });
                    }
                }
            }

            return orders;
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
        
        public int CreateItemOrder(int idCustomerOrder, int idItem, int amount) {
            using(MySqlConnection conn = GetConnection()) {
                conn.Open();
                string query = "INSERT INTO ItemOrder VALUES(0, @iditem, @idorder, @amount, 'REGISTERED')";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@iditem", idItem);
                cmd.Parameters.AddWithValue("@idorder", idCustomerOrder);
                cmd.Parameters.AddWithValue("@amount", amount);
                return cmd.ExecuteNonQuery();
            }
        }

        public int UpdateItemOrderStatus(int id, string newStatus)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "update ItemOrder set status = @newstatus where id_item_order = @idorder";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@newstatus", newStatus);
                cmd.Parameters.AddWithValue("@idorder", id);

                return cmd.ExecuteNonQuery();
            }
        }
    }
}
