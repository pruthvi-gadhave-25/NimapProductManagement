using Microsoft.EntityFrameworkCore;
using ProjectManagement.Models;

namespace ProjectManagement.AppDbContext
{
    public class ProductContext : DbContext
    {
        public ProductContext( DbContextOptions<ProductContext> options): base(options) { 
        
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

       
    }
}
