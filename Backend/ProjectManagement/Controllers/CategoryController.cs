using Microsoft.AspNetCore.Mvc;
using ProjectManagement.Models;
using ProjectManagement.Services.Interface;

namespace ProjectManagement.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController  :ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest("Invalid category data.");
            }

            var result = await _categoryService.AddCategory(category);
            if (result)
            {
                return Ok("Category added successfully.");
            }
            return StatusCode(500, "An error occurred while adding the category.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest("Category ID mismatch.");
            }

            var result = await _categoryService.UpdateCategory(category);
            if (result)
            {
                return Ok("Category updated successfully.");
            }
            return StatusCode(500, "An error occurred while updating the category.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryService.DeleteCategory(id);
            if (result)
            {
                return Ok("Category deleted successfully.");
            }
            return StatusCode(500, "An error occurred while deleting the category.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _categoryService.GetCategory(id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }
            return Ok(category);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategories();
            return Ok(categories);
        }
    }

}
