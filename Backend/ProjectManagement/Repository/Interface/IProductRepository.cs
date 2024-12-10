using ProjectManagement.DTO;
using ProjectManagement.Models;

namespace ProjectManagement.Repository.Interface
{
    public interface IProductRepository
    {
        public Task<List<Product>> GetAllProducts();
        public Task<Product> GetProduct(int id);

        public Task<bool> AddProduct(Product product);
        public Task<bool> UpdateProduct(Product product);
        public Task<bool> DeleteProduct(int id);

        public Task<List<ProductDto>> GetPaginatedProducts(int pageNumber, int pageSize);
    }
}
