using ProjectManagement.Models;
using ProjectManagement.Repository.Interface;
using ProjectManagement.Services.Interface;
using ProjectManagement.DTO;

namespace ProjectManagement.Services
{
    public class ProductService :IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<bool> AddProduct(Product product)
        {
            
            return await _productRepository.AddProduct(product);
        }

        public async Task<bool> UpdateProduct(Product product)
        {
            
            return await _productRepository.UpdateProduct(product);
        }

        public async Task<bool> DeleteProduct(int id)
        {
            
            return await _productRepository.DeleteProduct(id);
        }

        public async Task<Product> GetProduct(int id)
        {
           
            return await _productRepository.GetProduct(id);
        }

        public async Task<List<Product>> GetAllProducts()
        {
           
            return await _productRepository.GetAllProducts();
        }

        public async Task<List<ProductDto>> GetPaginatedProducts(int pageNumber, int pageSize)
        {
            return await _productRepository.GetPaginatedProducts(pageNumber, pageSize);
        }
    }

}
