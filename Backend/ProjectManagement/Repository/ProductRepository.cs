using Microsoft.EntityFrameworkCore;
using ProjectManagement.AppDbContext;
using ProjectManagement.DTO;
using ProjectManagement.Models;
using ProjectManagement.Repository.Interface;

namespace ProjectManagement.Repository
{
    public class ProductRepository : IProductRepository
    {

        private readonly ProductContext _productContext;

        public ProductRepository(ProductContext productContext)
        {
            _productContext = productContext;
        }

        public async Task<bool> AddProduct(Product product)
        {
            try
            {
                var entityEntry = await _productContext.AddAsync(product);
                await _productContext.SaveChangesAsync();

                return true;
            }
            catch(Exception ex) 
            {

                return false;
            }
        }

        public async  Task<bool> DeleteProduct(int id)
        {
            try
            {
                var entity = await _productContext.Products.FirstOrDefaultAsync(p =>  p.ProductId == id);
                if (entity != null)
                {
                    _productContext.Remove(entity);
                    await _productContext.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex) {
                return false;
            }
        }

        public async  Task<List<Product>> GetAllProducts()
        {
            try
            {
                return await _productContext.Products.ToListAsync();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async  Task<Product> GetProduct(int id)
        {
            var entity = await _productContext.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            return entity ;
        }

        public async  Task<bool> UpdateProduct(Product product)
        {
            try
            {
                _productContext.Update(product);
                await _productContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }


        public async Task<List<ProductDto>> GetPaginatedProducts(int pageNumber , int pageSize)
        {
            try
            {
                var data = await (from product in _productContext.Products
                                  join category in _productContext.Categories
                                  on product.CategoryId equals category.CategoryId
                                  select new ProductDto
                                  {
                                      ProductId = product.ProductId,
                                      ProductName = product.ProductName,
                                      CategoryId = product.CategoryId ,
                                      CategoryName = category.CategoryName
                                  })
                                  .Skip((pageNumber - 1) * pageSize)  
                                  .Take(pageSize) 
                                  .ToListAsync();  

                return data;
            }
            catch (Exception ex)
            {
                
                throw new Exception("Error fetching paginated products: " + ex.Message);
            }
        }
    }
}
