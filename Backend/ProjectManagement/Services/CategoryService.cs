using ProjectManagement.Models;
using ProjectManagement.Repository.Interface;
using ProjectManagement.Services.Interface;

namespace ProjectManagement.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<bool> AddCategory(Category category)
        {
            return await _categoryRepository.AddCategory(category);
        }

        public async Task<bool> UpdateCategory(Category category)
        {
            return await _categoryRepository.UpdateCategory(category);
        }

        public async Task<bool> DeleteCategory(int id)
        {
            return await _categoryRepository.DeleteCategory(id);
        }

        public async Task<Category> GetCategory(int id)
        {
           
            return await _categoryRepository.GetCategory(id);
        }

        public async Task<List<Category>> GetAllCategories()
        {
            
            return await _categoryRepository.GetAllCategories();
        }
    }

}
