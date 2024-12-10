using Microsoft.AspNetCore.Mvc;
using ProjectManagement.Models;
using ProjectManagement.Services.Interface;

namespace ProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase 
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Invalid product data.");
            }

            var result = await _productService.AddProduct(product);
            if (result)
            {
                return Ok("Product added successfully.");
            }
            return StatusCode(500, "An error occurred while adding the product.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest("Product ID mismatch.");
            }

            var result = await _productService.UpdateProduct(product);
            if (result)
            {
                return Ok("Product updated successfully.");
            }
            return StatusCode(500, "An error occurred while updating the product.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productService.DeleteProduct(id);
            if (result)
            {
                return Ok("Product deleted successfully.");
            }
            return StatusCode(500, "An error occurred while deleting the product.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _productService.GetProduct(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            return Ok(product);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("GetPaginatedProducts/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> GetPaginaetedProducts (int pageNumber , int pageSize)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest("Page number and page size must be greater than 0.");
            }
            var productList =  await _productService.GetPaginatedProducts(pageNumber, pageSize);

            if (productList == null || !productList.Any())
            {
                return NotFound("No products found for the specified page.");
            }

            return Ok(productList);
        }
    }

}
