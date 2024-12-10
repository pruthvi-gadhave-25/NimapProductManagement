using ProjectManagement.Models;
using ProjectManagement.DTO;

namespace ProjectManagement.Services.Interface
{
    public interface IProductService
    {
        Task<bool> AddProduct(Product product);
        Task<bool> UpdateProduct(Product product);
        Task<bool> DeleteProduct(int id);
        Task<Product> GetProduct(int id);
        Task<List<Product>> GetAllProducts();

        public Task<List<ProductDto>> GetPaginatedProducts(int pageNumber, int pageSize);
    }
}
